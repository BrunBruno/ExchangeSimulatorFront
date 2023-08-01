import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../Shared/options/ApiOptions";
import { GameSortOption } from "./ManageGamePageOptions";

import classes from "./ManageGamePage.module.scss";

import Header from "../hub-shared/header/Header";
import Pagination from "../../Shared/pages/pagination/Pagination";
import Details from "./details-section/Details";
import Card from "./card-section/Card";

import SortOptionSvg from "../../Shared/svgs/SortOption";
import DetailsSvg from "../../Shared/svgs/DetailsSvg";

function ManageGamePage() {
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
        authorization(localStorage.getItem("token"))
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
          <div className={classes.background}>
            <DetailsSvg />
          </div>
          <h2>Manage your games.</h2>
          <div className={classes["manage__games__bar__inputs"]}>
            <input
              type="text"
              placeholder="Game Name"
              onChange={onSearchByName}
            />
            <button type="button" onClick={toggleDropdown}>
              <SortOptionSvg />
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
          fontSize={1.2}
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
            <h3>Game Manager</h3>
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

export default ManageGamePage;
