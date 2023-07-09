import classes from "./Games.module.scss";

function Card(props) {
  let currentPage = 1;
  let totalPages = 5;
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const onPageChange = () => {};

  return (
    <div className={`${classes["games__card"]} ${classes["column-fit"]}`}>
      <h2>{props.title}</h2>
      <form className={classes["form-search"]}>
        <input type="text" />
        <button>Search</button>
      </form>
      <ul>
        <li>Game 1</li>
        <li>Game 2</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
        <li>Game 3</li>
      </ul>
      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {"<"}
        </button>

        {pageNumbers.map((pageNumber, index) => {
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === currentPage - 3 && currentPage !== 4) ||
            (pageNumber === currentPage + 3 && currentPage !== totalPages - 3)
          ) {
            return <span key={pageNumber}>...</span>;
          }
          return null;
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Card;
