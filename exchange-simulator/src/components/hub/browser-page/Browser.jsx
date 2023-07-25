import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import classes from "./Browser.module.scss";
import cardclasses from "./Card/Card.module.scss";

import baseUrl from "../../Shared/Url";
import Card from "./Card/Card";
import Header from "../hub-shared/header/Header";
import Pagination from "../hub-shared/pagination/Pagination";

function Browser() {
  const gamesPerPage = 6;
  const GameSortOption = {
    Date: 0,
    Name: 1,
    Owner: 2,
  };
  const gamesTypes = {
    current: "current-games",
    available: "available-games",
    previous: "previous-games",
  };
  const joiningOptions = {
    no: 0,
    join: 1,
    rejoin: 2,
  };

  const containerRef = useRef(null);
  const cardsConatinerRef = useRef(null);
  const cardsRefs = useRef([]);

  const location = useLocation();

  const [gameList, setGameList] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalGames, setTotalGams] = useState(0);
  const [displayError, setDisplayError] = useState(false);

  // search options
  const [currentName, setCurrentName] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortOption, setCurrentSortOption] = useState(
    GameSortOption.Date
  );

  const [gamesType, setGamesType] = useState(null);

  useEffect(() => {
    setGamesType(location.state.title.toLowerCase().replace(" ", "-"));
  }, [location.state.title]);

  const GetData = useCallback(async () => {
    if (gamesType !== null) {
      try {
        const games = await axios.get(
          `${baseUrl}/game/${gamesType}?gameName=${currentName}&ownerName=${currentOwner}&pageNumber=${currentPage}&sortOption=${currentSortOption}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setGameList(games.data.items);
        setTotalPages(games.data.totalPages);
        setTotalGams(games.data.totalItemsCount);

        pageChangeAnimation();
      } catch (err) {
        console.log(err);
        setDisplayError(true);
      }
    }
  }, [gamesType, currentName, currentOwner, currentPage, currentSortOption]);

  useEffect(() => {
    GetData();
  }, [GetData]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (cardsConatinerRef.current) {
      cardsConatinerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSearchByName = (event) => {
    setCurrentName(event.target.value.toLowerCase());
  };

  const onSearchByAuthor = (event) => {
    setCurrentOwner(event.target.value.toLowerCase());
  };

  const onSelectSortType = (event) => {
    setCurrentSortOption(parseInt(event.target.value, 10));
  };

  const onSelectGame = (game) => {
    setSelectedGame(game);
  };

  const pageChangeAnimation = () => {
    setTimeout(() => {
      cardsRefs.current.forEach((element) => {
        if (element) {
          element.classList.add(cardclasses.hidden);
        }
      });
    }, 100);
    setTimeout(() => {
      cardsRefs.current.forEach((element) => {
        setTimeout(() => {
          if (element) {
            element.classList.remove(cardclasses.hidden);
          }
        }, 50 * Math.floor(Math.random() * gamesPerPage) + 1);
      });
    }, 100);
  };

  return (
    <div ref={containerRef}>
      <Header containerRef={containerRef} />
      <div className={classes.browser}>
        <div className={classes["browser__search"]}>
          <h2>{location.state.title.replace("-", " ").toUpperCase()}</h2>

          <input
            type="text"
            placeholder="Game Name"
            onChange={onSearchByName}
          />
          <input type="text" placeholder="Author" onChange={onSearchByAuthor} />
          <div className={classes.radios}>
            <label>
              <input
                type="radio"
                value={GameSortOption.Date}
                checked={currentSortOption === GameSortOption.Date}
                onChange={onSelectSortType}
                name="sortOption"
              />
              <span>Date</span>
            </label>
            <label>
              <input
                type="radio"
                value={GameSortOption.Name}
                checked={currentSortOption === GameSortOption.Name}
                onChange={onSelectSortType}
                name="sortOption"
              />
              <span>Name</span>
            </label>
            <label>
              <input
                type="radio"
                value={GameSortOption.Owner}
                checked={currentSortOption === GameSortOption.Owner}
                onChange={onSelectSortType}
                name="sortOption"
              />
              <span>Owner</span>
            </label>
          </div>
          {totalGames === 1 ? (
            <p>{totalGames} game found.</p>
          ) : (
            <p>{totalGames} games found.</p>
          )}
          {selectedGame === null ? (
            ""
          ) : (
            <div className={classes["browser__search__details"]}>
              <p>
                <span>Game: </span>
                {selectedGame.name}
              </p>
              <p>
                <span>Creator: </span>
                {selectedGame.ownerName}
              </p>
              <p>
                <span>Description: </span>
                {selectedGame.description}
              </p>
              <p>
                <span>Available spots: </span>
                {selectedGame.availableSpots}
              </p>
              <p>
                <span>Created At: </span>
                {new Date(selectedGame.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
        <div className={classes["browser__cards"]}>
          <div
            ref={cardsConatinerRef}
            className={classes["browser__cards__container"]}
          >
            {displayError ? (
              <div>
                <div className={classes.error}>Connection error.</div>
              </div>
            ) : (
              <>
                {gameList.length === 0 ? (
                  <div>
                    <div className={classes.error}>No games found.</div>
                  </div>
                ) : (
                  <ul>
                    {gameList.map((game, index) => {
                      let joinOption;

                      if (gamesType === gamesTypes.current) {
                        joinOption = joiningOptions.rejoin;
                      } else if (gamesType === gamesTypes.available) {
                        joinOption = joiningOptions.join;
                      } else if (gamesType === gamesTypes.previous) {
                        joinOption = joiningOptions.no;
                      }

                      return (
                        <Card
                          key={index}
                          game={game}
                          cardRef={(el) => (cardsRefs.current[index] = el)}
                          index={index}
                          join={joinOption}
                          onSelectGame={onSelectGame}
                        />
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Browser;
