import classes from "./Pagination.module.scss";

import ArrowLeftSvg from "../../svgs/ArrowLeftSvg";
import ArrowRightSvg from "../../svgs/ArrowRightSvg";

function Pagination({ currentPage, totalPages, onPageChange, fontSize }) {
  const renderPageButtons = (array) => {
    const buttonsToShow = 3;
    if (totalPages <= buttonsToShow) {
      return array.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={currentPage === pageNumber ? classes.currentPage : ""}
          style={{ fontSize: `${fontSize}rem` }}
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
        endPage = Math.min(totalPages, buttonsToShow);
      } else if (endPage >= totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - buttonsToShow + 1);
      }
      return (
        <>
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                style={{ fontSize: `${fontSize}rem` }}
              >
                1
              </button>
              {startPage >= 2 && <p>...</p>}
            </>
          )}

          {array.slice(startPage - 1, endPage).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={currentPage === pageNumber}
              className={currentPage === pageNumber ? classes.currentPage : ""}
              style={{ fontSize: `${fontSize}rem` }}
            >
              {pageNumber}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage <= totalPages - 1 && <p>...</p>}
              <button
                onClick={() => onPageChange(totalPages)}
                style={{ fontSize: `${fontSize}rem` }}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className={classes.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={classes.currentPage}
        style={{ fontSize: `${fontSize}rem` }}
      >
        <ArrowLeftSvg />
      </button>

      {renderPageButtons(
        Array.from({ length: totalPages }, (_, index) => index + 1)
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={classes.currentPage}
        style={{ fontSize: `${fontSize}rem` }}
      >
        <ArrowRightSvg />
      </button>
    </div>
  );
}

export default Pagination;
