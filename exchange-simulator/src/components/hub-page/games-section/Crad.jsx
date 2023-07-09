import { useState } from "react";
import classes from "./Games.module.scss";

function Card(props) {
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 50;
  const buttonsToShow = 3;
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = () => {
    if (totalPages <= buttonsToShow) {
      return pageNumbers.map((pageNumber) => (
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

          {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
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
    <div className={`${classes["games__card"]} ${classes["column-fit"]}`}>
      <h2>{props.title}</h2>
      <form className={classes["form-search"]}>
        <input type="text" />
        <button>Search</button>
      </form>
      <ul>
        <li>Game</li>
        <li>Game</li>
        <li>Game</li>
        <li>Game</li>
        <li>Game</li>
      </ul>
      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={classes.currentPage}
        >
          {"<"}
        </button>

        {renderPageButtons()}

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
