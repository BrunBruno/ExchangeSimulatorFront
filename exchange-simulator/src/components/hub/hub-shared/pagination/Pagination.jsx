import classes from "./Pagination.module.scss";

function Pagination({ currentPage, totalPages, onPageChange }) {
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
    <div className={classes.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={classes.currentPage}
      >
        <svg
          viewBox="-4.5 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <g fill="none">
            <g transform="translate(-305.000000, -6679.000000)" fill="#fff">
              <g transform="translate(56.000000, 160.000000)">
                <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"></path>
              </g>
            </g>
          </g>
        </svg>
      </button>

      {renderPageButtons(
        Array.from({ length: totalPages }, (_, index) => index + 1)
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={classes.currentPage}
      >
        <svg
          viewBox="-4.5 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <g transform="translate(-305.000000, -6679.000000)" fill="#fff">
              <g transform="translate(56.000000, 160.000000)">
                <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
