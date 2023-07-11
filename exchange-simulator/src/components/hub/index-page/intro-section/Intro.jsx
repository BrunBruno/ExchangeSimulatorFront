import { useEffect, useRef } from "react";
import classes from "./Intro.module.scss";
import Bar from "../bar-section/Bar";
import Logo from "../../../Shared/Logo";

function Intro() {
  const introRef = useRef(null);
  useEffect(() => {
    introRef.current.classList.remove(classes["hidden-intro"]);
  }, []);

  return (
    <div className={classes.intro}>
      <div className={classes["intro__logo"]}>
        <div className={classes.figure}>
          <div>
            <Logo />
          </div>
          <div>
            <Logo />
          </div>
          <div></div>
        </div>
      </div>
      <div className={classes["intro__content"]}>
        <div
          ref={introRef}
          className={`${classes.introduction} ${classes["hidden-intro"]}`}
        >
          <h1>Welcome to the Exchange Simulator!</h1>
          <p>
            In this interactive simulator, you can explore the exciting world of
            currency exchange. Whether you're an aspiring trader or simply
            curious about how exchange rates work, this simulator provides you
            with a hands-on experience.
          </p>
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default Intro;
