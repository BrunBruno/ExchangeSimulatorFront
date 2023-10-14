import { useEffect, useRef } from "react";

import classes from "./Tutorial.module.scss";

import PlusSvg from "../../../Shared/svgs/PlusSvg";
import HandSvg from "../../../Shared/svgs/HandSvg";
import SearchSvg from "../../../Shared/svgs/SearchSvg";
import GameControllerSvg from "../../../Shared/svgs/GameControllerSvg";
import CupSvg from "../../../Shared/svgs/CupSvg";

function Tutorial() {
  const rowRef = useRef([]);

  const createRef = useRef(null);
  const searchRef = useRef(null);
  const cupRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove(classes["hidden-row"]);
          }, 500);

          // if (entry.target === rowRef.current[1]) {
          //   createRef.current.classList.add(classes["create-icon-running"]);
          // }
          // if (entry.target === rowRef.current[3]) {
          //   searchRef.current.classList.add(classes["search-icon-running"]);
          // }
          // if (entry.target === rowRef.current[5]) {
          //   cupRef.current.classList.add(classes["cup-icon-running"]);
          // }
        }
      });
    });

    if (rowRef.current) {
      rowRef.current.forEach((element) => {
        observer.observe(element);
      });
    }
  }, [rowRef]);

  const onAnimationRun = (ref, className, delay) => {
    if (!ref.current.classList.contains(className)) {
      ref.current.classList.add(className);

      setTimeout(() => {
        ref.current.classList.remove(className);
      }, delay);
    }
  };

  return (
    <div className={classes.tutorial}>
      <div
        ref={(event) => (rowRef.current[0] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      />
      <div
        ref={(event) => (rowRef.current[1] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      >
        <div
          className={classes["tutorial__row__content"]}
          onMouseEnter={() => {
            onAnimationRun(createRef, classes["create-icon-running"], 3000);
          }}
        >
          <div className={classes["inner-content"]}>
            <h2>Create Name Game</h2>
            <div ref={createRef} className={classes["create-icon"]}>
              <div className={classes.hand}>
                <HandSvg />
              </div>
              <div className={classes.plus}>
                <PlusSvg />
              </div>
            </div>
            <div className={classes["create-text"]}>
              In the Exchange Simulator platform, users can create their own
              games to simulate trading activities and compete with other
              players. A game is a virtual environment where participants can
              trade various coins and compete to achieve the highest returns
              within a specified duration.
            </div>
          </div>
        </div>
        <div className={classes.border}></div>
      </div>
      <div
        ref={(event) => (rowRef.current[2] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      />
      <div
        ref={(event) => (rowRef.current[3] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      >
        <div className={classes.border}></div>
        <div
          className={classes["tutorial__row__content"]}
          onMouseEnter={() => {
            onAnimationRun(searchRef, classes["search-icon-running"], 4000);
          }}
        >
          <div className={classes["inner-content"]}>
            <h2>Search For Games</h2>
            <div ref={searchRef} className={classes["search-icon"]}>
              <div className={classes.game}>
                <GameControllerSvg />
              </div>
              <div className={classes.search}>
                <SearchSvg />
              </div>
              <div className={classes.cover}></div>
            </div>
            <div className={classes["search-text"]}>
              The Game Browser in the Exchange Simulator platform empowers users
              to explore a diverse range of games by filtering and searching for
              specific criteria, making it a breeze to discover exciting trading
              opportunities. By tailoring their trading journey and joining
              games that match their style, players can immerse themselves in
              captivating virtual trading experiences with ease.
            </div>
          </div>
        </div>
      </div>
      <div
        ref={(event) => (rowRef.current[4] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      />
      <div
        ref={(event) => (rowRef.current[5] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      >
        <div
          className={classes["tutorial__row__content"]}
          onMouseEnter={() => {
            onAnimationRun(cupRef, classes["cup-icon-running"], 1000);
          }}
        >
          <div className={classes["inner-content"]}>
            <h2>Trade and Win!</h2>
            <div ref={cupRef} className={classes["cup-icon"]}>
              <div className={classes.cup}>
                <CupSvg />
              </div>
              <div className={classes.circle}></div>
            </div>
            <div className={classes["cup-text"]}>
              In this tutorial, you've discovered the Exchange Simulator, a
              thrilling platform that lets you unleash your trading skills and
              compete in a dynamic virtual environment. With virtual currency,
              you can trade fearlessly, learn, collaborate, and grow as a
              trader. Embrace the excitement of competition, strategize wisely,
              and embark on a journey of trading triumphs. Happy trading in the
              Exchange Simulator, where success awaits!
            </div>
          </div>
        </div>
        <div className={classes.border}></div>
      </div>
      <div
        ref={(event) => (rowRef.current[6] = event)}
        className={`${classes["tutorial__row"]} ${classes["hidden-row"]}`}
      />
    </div>
  );
}

export default Tutorial;
