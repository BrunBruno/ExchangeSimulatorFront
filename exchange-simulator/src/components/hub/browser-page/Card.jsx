import { useEffect, useState } from "react";

import classes from "./Card.module.scss";
import axios from "axios";
import baseUrl from "../../Shared/Url";

function Card(props) {
  const [gameList, setGameList] = useState([]);
  const [filteredGameList, setFilteredGameList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const onLoadGames = async () => {
      try {
        const games = await axios.get(`${baseUrl}/game/available-games`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setGameList(games.data);
      } catch (err) {
        console.log(err);
      }
    };

    onLoadGames();
  }, []);

  useEffect(() => {
    setFilteredGameList(gameList);
  }, [gameList]);

  const gamesPerPage = 10;
  const buttonsToShow = 3;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGameList.slice(
    indexOfFirstGame,
    indexOfLastGame
  );
  const totalPages = Math.ceil(filteredGameList.length / gamesPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onFliterGames = (event) => {
    const filteredGames = gameList.filter((game) =>
      game.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredGameList(filteredGames);
  };

  const renderPageButtons = (array) => {
    if (totalPages <= buttonsToShow) {
      return array.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={currentPage === pageNumber ? classes.currentPage : ""}
        >
          {pageNumber}
        </button>
      ));
    } else {
      const middlePage = Math.floor(buttonsToShow / 2);
      let startPage = currentPage - middlePage;
      let endPage = currentPage + middlePage;

      if (startPage <= 1) {
        startPage = 1;
        endPage = buttonsToShow + 2;
      } else if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = totalPages - buttonsToShow - 1;
      }

      return (
        <>
          {startPage > 1 && (
            <>
              <button onClick={() => onPageChange(1)}>1</button>
              {startPage >= 2 && <p>...</p>}
            </>
          )}

          {array.slice(startPage - 1, endPage).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={currentPage === pageNumber}
              className={currentPage === pageNumber ? classes.currentPage : ""}
            >
              {pageNumber}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage <= totalPages - 1 && <p>...</p>}
              <button onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className={classes.card}>
      <h2>{props.title}</h2>
      <form className={classes["form-search"]}>
        <input type="text" placeholder="Search" onChange={onFliterGames} />
      </form>
      <ul>
        {filteredGameList.map((game, index) => (
          <li key={index}>
            <div>
              {indexOfFirstGame + index + 1}. {game.name}
            </div>
            <div>
              <button>Join Now</button>
              <button>Check Details</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={classes.currentPage}
        >
          {"<"}
        </button>

        {renderPageButtons(
          Array.from({ length: totalPages }, (_, index) => index + 1)
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={classes.currentPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Card;
