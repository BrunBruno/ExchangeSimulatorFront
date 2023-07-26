import { useEffect, useRef } from "react";
import classes from "./Ranking.module.scss";
import Table from "./Table";

function Ranking() {
  const rankingRef = useRef(null);
  const rankingTitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            rankingTitleRef.current.classList.remove(classes["hidden-title"]);
          }, 500);
        }
      });
    });

    if (rankingRef.current) {
      observer.observe(rankingRef.current);
    }
  }, [rankingRef]);

  return (
    <div className={classes.ranking}>
      <div className={classes["ranking__content"]}>
        <div className={classes["ranking__content__column"]}>
          <Table />
        </div>
        <div ref={rankingRef} className={classes["ranking__content__column"]}>
          <h2 ref={rankingTitleRef} className={classes["hidden-title"]}>
            Check out the best players!
            <svg
              viewBox="0 0 426 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 90.0526C-3.66666 81.5848 -3.66667 60.4152 11 51.9474L95 3.45002C109.667 -5.01778 128 5.56697 128 22.5026L128 119.497C128 136.433 109.667 147.018 95 138.55L11 90.0526Z" />
              <path d="M309 90.0526C294.333 81.5848 294.333 60.4152 309 51.9474L393 3.45002C407.667 -5.01778 426 5.56697 426 22.5026V119.497C426 136.433 407.667 147.018 393 138.55L309 90.0526Z" />
              <path d="M159 90.0526C144.333 81.5848 144.333 60.4152 159 51.9474L243 3.45002C257.667 -5.01778 276 5.56697 276 22.5026V119.497C276 136.433 257.667 147.018 243 138.55L159 90.0526Z" />
            </svg>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
