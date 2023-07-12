import { useEffect, useRef } from "react";
import classes from "./Tutorial.module.scss";

function Tutorial() {
  const rowRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove(classes["hidden-row"]);
          }, 500);
        }
      });
    });

    if (rowRef.current) {
      rowRef.current.forEach((element) => {
        observer.observe(element);
      });
    }
  }, [rowRef]);

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
        <div className={classes["tutorial__row__content"]}>
          <h2>Step</h2>
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
        <div className={classes["tutorial__row__content"]}>
          <h2>Step</h2>
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
        <div className={classes["tutorial__row__content"]}>
          <h2>Step</h2>
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
