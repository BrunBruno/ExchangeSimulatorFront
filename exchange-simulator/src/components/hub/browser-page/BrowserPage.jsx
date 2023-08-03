import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import usePopup from "../../Shared/hooks/usePopup ";
import { makeFullDate } from "../../Shared/functions/extra-functions";
import { baseUrl, authorization } from "../../Shared/options/ApiOptions";
import {
  GameSortOption,
  JoiningOptions,
  GameTypes,
} from "./BrowserPageOptions";

import classes from "./BrowserPage.module.scss";
import cardclasses from "./card-section/Card.module.scss";

import Card from "./card-section/Card";
import Header from "../hub-shared/header/Header";
import Pagination from "../../Shared/pages/pagination/Pagination";

import SearchSvg from "../../Shared/svgs/SearchSvg";
import GameControllerSvg from "../../Shared/svgs/GameControllerSvg";
import TimeSvg from "../../Shared/svgs/TimeSvg";

function Browser() {
  const location = useLocation();

  const gamesPerPage = 6;

  const containerRef = useRef(null);
  const cardsConatinerRef = useRef(null);
  const cardsRefs = useRef([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const [gameType, setGameType] = useState(null);

  // popup options
  const [infoPpupRef, popupContent, setPopupContent] = usePopup(
    classes["hidden-popup"]
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const smallStyles = {
    height: `${50 * gameList.length}%`,
    gridTemplateRows: `repeat(${gameList.length}, 1fr)`,
  };
  const midStyles = {
    height: `${50 * gameList.length}%`,
    gridTemplateRows: `repeat(${gameList.length / 2}, 1fr)`,
  };

  let ulStyles;
  if (windowWidth < 600) {
    ulStyles = smallStyles;
  } else if (windowWidth >= 600 && windowWidth < 800) {
    ulStyles = midStyles;
  } else {
    ulStyles = {};
  }

  useEffect(() => {
    setGameType(location.state.title.toLowerCase().replace(" ", "-"));
  }, [location.state.title]);

  const GetData = useCallback(async () => {
    if (gameType !== null) {
      try {
        const games = await axios.get(
          `${baseUrl}/game/${gameType}?gameName=${currentName}&ownerName=${currentOwner}&pageNumber=${currentPage}&sortOption=${currentSortOption}`,
          authorization(localStorage.getItem("token"))
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
  }, [gameType, currentName, currentOwner, currentPage, currentSortOption]);

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
    <div ref={containerRef} className={classes.browser}>
      <Header containerRef={containerRef} />
      <div className={classes["browser__search"]}>
        <h2>{location.state.title.replace("-", " ").toUpperCase()}</h2>
        <input type="text" placeholder="Game Name" onChange={onSearchByName} />
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
              {makeFullDate(selectedGame.createdAt)}
            </p>
          </div>
        )}
        <div className={classes.backgroud}>
          {gameType === GameTypes.current ? (
            <GameControllerSvg />
          ) : gameType === GameTypes.available ? (
            <SearchSvg />
          ) : gameType === GameTypes.previous ? (
            <TimeSvg />
          ) : (
            ""
          )}
        </div>
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
                <ul style={ulStyles}>
                  {gameList.map((game, index) => {
                    let joinOption;

                    if (gameType === GameTypes.current) {
                      joinOption = JoiningOptions.rejoin;
                    } else if (gameType === GameTypes.available) {
                      joinOption = JoiningOptions.join;
                    } else if (gameType === GameTypes.previous) {
                      joinOption = JoiningOptions.no;
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
          fontSize={1.6}
        />
      </div>
      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      >
        {popupContent}
      </div>
    </div>
  );
}

export default Browser;
