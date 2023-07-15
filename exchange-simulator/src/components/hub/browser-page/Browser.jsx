import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import classes from "./Browser.module.scss";
import cardclasses from "./Card.module.scss";

import baseUrl from "../../Shared/Url";
import Card from "./Card";
import Header from "../header-shared/Header";

function Browser() {
  const containerRef = useRef(null);
  const cardsRefs = useRef([]);

  const location = useLocation();

  const [gameList, setGameList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    const GetData = async (input = "", page = 1) => {
      try {
        const games = await axios.get(
          `${baseUrl}/game/${location.state.title
            .toLowerCase()
            .replace(
              " ",
              "-"
            )}?gameName=${input}&ownerName=${input}&pageNumber=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setGameList(games.data.items);
        setTotalPages(games.data.totalPages);
        setCurrentPage(page);
      } catch (err) {
        console.log(err);
        setDisplayError(true);
      }
    };

    GetData();
  }, []);

  // const indexOfLastGame = currentPage * gamesPerPage;
  // const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  // const totalPages = Math.ceil(filteredGameList.length / gamesPerPage);
  // const currentGames = filteredGameList.slice(
  //   indexOfFirstGame,
  //   indexOfLastGame
  // );

  const onPageChange = (pageNumber) => {
    GetData((page = pageNumber));
    // setTimeout(() => {
    //   cardsRefs.current.forEach((element) => {
    //     if (element) {
    //       element.classList.add(cardclasses.hidden);
    //     }
    //   });
    // }, 100);
    // setTimeout(() => {
    //   cardsRefs.current.forEach((element, index) => {
    //     setTimeout(() => {
    //       if (element) {
    //         element.classList.remove(cardclasses.hidden);
    //       }
    //     }, 50 * Math.floor(Math.random() * gamesPerPage) + 1);
    //   });
    // }, 100);
  };

  const onFliterGames = async (event) => {
    GetData((input = event.target.value.toLowerCase()));
    // const filteredGames = gameList.filter((game) =>
    //   game.name.toLowerCase().includes(event.target.value.toLowerCase())
    // );
    // setFilteredGameList(filteredGames);
    // onPageChange(1);
  };

  const renderPageButtons = (array) => {
    const buttonsToShow = 3;
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
    <div ref={containerRef}>
      <Header containerRef={containerRef} />
      <div className={classes.browser}>
        <div className={classes["browser__search"]}>
          <h2>{location.state.title}</h2>
          <input type="text" placeholder="Search" onChange={onFliterGames} />
        </div>
        <div className={classes["browser__cards"]}>
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
                  {gameList.map((game, index) => (
                    <Card
                      key={index}
                      name={game.name}
                      owner={game.ownerName}
                      cardRef={(el) => (cardsRefs.current[index] = el)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
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
      </div>
    </div>
  );
}

export default Browser;
