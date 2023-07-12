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
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
