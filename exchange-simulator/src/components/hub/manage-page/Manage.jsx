import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../hub-shared/Header";
import classes from "./Manage.module.scss";
import Details from "./details-section/Details";
import axios from "axios";
import baseUrl from "../../Shared/Url";
import Pagination from "../hub-shared/Pagination";

function Manage() {
  const gamesStatus = ["available", "active", "finished"];
  const GameSortOption = {
    Date: 0,
    Name: 1,
  };
  const containerRef = useRef(null);

  const [selectedGame, setSelectedGame] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalGames, setTotalGams] = useState(0);

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
  };

  return (
    <div ref={containerRef} className={classes.manage}>
      <Header containerRef={containerRef} />
      <div className={classes["manage__games"]}>
        <div className={classes["manage__games__bar"]}>
          <h2>Manage your games.</h2>
          <input
            type="text"
            placeholder="Game Name"
            onChange={onSearchByName}
          />
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
          </div>
          {totalGames === 1 ? (
            <p>{totalGames} game found.</p>
          ) : (
            <p>{totalGames} games found.</p>
          )}
        </div>
        <div className={classes["manage__games__list"]}>
          <div className={classes["manage__games__list__header"]}>
            <span>Game Name</span>
            <span>Players</span>
            <span>Status</span>
            <span>Created At</span>
          </div>
          <ul>
            {gameList.map((game, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelectGame(game);
                }}
              >
                <span>{game.name}</span>
                <span>{game.playerCount}</span>
                <span>{gamesStatus[game.status]}</span>
                <span>{new Date(game.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div className={classes["manage__details"]}>
        {selectedGame === null ? (
          <div className={classes.info}>
            <h3>Hello</h3>
            <p>No game selected.</p>
            <p>Please select game to manage it.</p>
          </div>
        ) : (
          <Details key={selectedGame.name} game={selectedGame} />
        )}
      </div>
    </div>
  );
}

export default Manage;
