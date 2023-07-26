import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import classes from "./Manage.module.scss";

import baseUrl from "../../Shared/Url";
import Header from "../hub-shared/header/Header";
import Details from "./details-section/Details";
import Pagination from "../hub-shared/pagination/Pagination";
import Card from "./card/Card";

function Manage() {
  // const windowWidth = window.innerWidth;
  const GameSortOption = { Date: 0, Name: 1 };

  const containerRef = useRef(null);
  const detailsRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(false);

  // games options
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalGames, setTotalGams] = useState(0);

  // combobox options
  const [isOpen, setIsOpen] = useState(false);

  // search options
  const [currentName, setCurrentName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortOption, setCurrentSortOption] = useState(
    GameSortOption.Date
  );

  const GetData = useCallback(async () => {
    try {
      const games = await axios.get(
        `${baseUrl}/game/owner-games?gameName=${currentName}&ownerName=&pageNumber=${currentPage}&sortOption=${currentSortOption}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setGameList(games.data.items);
      setTotalPages(games.data.totalPages);
      setTotalGams(games.data.totalItemsCount);
    } catch (err) {
      console.log(err);
    }
  }, [currentName, currentPage, currentSortOption]);

  useEffect(() => {
    GetData();
  }, [GetData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setWindowWidth(true);
      } else {
        setWindowWidth(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onSearchByName = (event) => {
    setCurrentName(event.target.value.toLowerCase());
  };

  const onSelectSortType = (event) => {
    setCurrentSortOption(parseInt(event.target.value, 10));
  };

  const onSelectGame = (game) => {
    setSelectedGame(game);

    if (
      detailsRef.current &&
      detailsRef.current.classList.contains(classes.hidden)
    ) {
      detailsRef.current.classList.remove(classes.hidden);
    }
  };

  const onCloseDetails = () => {
    setSelectedGame(null);
    if (detailsRef.current && windowWidth) {
      detailsRef.current.classList.add(classes.hidden);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className={classes.manage}>
      <Header containerRef={containerRef} />
      <div className={classes["manage__games"]}>
        <div className={classes["manage__games__bar"]}>
          <h2>Manage your games.</h2>
          <div className={classes["manage__games__bar__inputs"]}>
            <input
              type="text"
              placeholder="Game Name"
              onChange={onSearchByName}
            />
            <button type="button" onClick={toggleDropdown}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0686 15H7.9313C7.32548 15 7.02257 15 6.88231 15.1198C6.76061 15.2238 6.69602 15.3797 6.70858 15.5393C6.72305 15.7232 6.93724 15.9374 7.36561 16.3657L11.4342 20.4344C11.6323 20.6324 11.7313 20.7314 11.8454 20.7685C11.9458 20.8011 12.054 20.8011 12.1544 20.7685C12.2686 20.7314 12.3676 20.6324 12.5656 20.4344L16.6342 16.3657C17.0626 15.9374 17.2768 15.7232 17.2913 15.5393C17.3038 15.3797 17.2392 15.2238 17.1175 15.1198C16.9773 15 16.6744 15 16.0686 15Z"
                  stroke="#e3fafc"
                />
                <path
                  d="M7.9313 9.00005H16.0686C16.6744 9.00005 16.9773 9.00005 17.1175 8.88025C17.2393 8.7763 17.3038 8.62038 17.2913 8.46082C17.2768 8.27693 17.0626 8.06274 16.6342 7.63436L12.5656 3.56573C12.3676 3.36772 12.2686 3.26872 12.1544 3.23163C12.054 3.199 11.9458 3.199 11.8454 3.23163C11.7313 3.26872 11.6323 3.36772 11.4342 3.56573L7.36561 7.63436C6.93724 8.06273 6.72305 8.27693 6.70858 8.46082C6.69602 8.62038 6.76061 8.7763 6.88231 8.88025C7.02257 9.00005 7.32548 9.00005 7.9313 9.00005Z"
                  stroke="#e3fafc"
                />
              </svg>
            </button>
            {isOpen && (
              <div className={classes.radios}>
                <label>
                  <input
                    type="radio"
                    value={GameSortOption.Date}
                    checked={currentSortOption === GameSortOption.Date}
                    onChange={onSelectSortType}
                    onClick={toggleDropdown}
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
                    onClick={toggleDropdown}
                    name="sortOption"
                  />
                  <span>Name</span>
                </label>
              </div>
            )}
          </div>

          {totalGames === 1 ? (
            <p>{totalGames} game found.</p>
          ) : (
            <p>{totalGames} games found.</p>
          )}
        </div>
        <div className={classes["manage__games__list"]}>
          {gameList.length > 0 ? (
            <ul>
              {gameList.map((game, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelectGame(game);
                  }}
                >
                  <Card game={game} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={classes.nogames}>
              You do not have any games!
              <br />
              Please create one to manage it.
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div
        ref={detailsRef}
        className={`${classes["manage__details"]} ${
          windowWidth ? classes.hidden : ""
        }`}
      >
        {selectedGame === null ? (
          <div className={classes.info}>
            <h3>Hello</h3>
            <p>No game selected.</p>
            <p>Please select game to manage it.</p>
          </div>
        ) : (
          <Details
            key={selectedGame.name}
            game={selectedGame}
            onCloseDetails={onCloseDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Manage;
