import { useEffect, useRef } from "react";

import { Rotations } from "../HomePageOptions";

import classes from "./Hero.module.scss";
import ArrowRightSvg from "../../../Shared/svgs/ArrowRightSvg";

function Hero(props) {
  const figureRef = useRef(null);

  // resize animated cube
  const handleResize = () => {
    if (figureRef && figureRef.current) {
      const figure = figureRef.current;
      figure.childNodes.forEach((d, i) => {
        const transformSize = figure.offsetWidth / 2;

        // adjust cube
        d.style.transform = `${Rotations[i]} translateZ(${
          transformSize * 1.5
        }px)`;

        // adjust cubs walls
        d.childNodes.forEach((p, i) => {
          if (i !== 0 && i !== d.childNodes.length - 1) {
            p.style.transform = `${Rotations[i]} translateZ(${transformSize}px)`;
          }
        });
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.hero}>
      <div className={classes["hero__content"]}>
        <div className={classes["hero__content__intro"]}>
          <h1>
            <div>Welcome to</div>
            <div>Exchange Simulator</div>
          </h1>
          <p>
            Immerse yourself in the dynamic realm of financial markets through
            our exchange simulator game webpage, where you can test your trading
            strategies, learn new techniques, and compete with fellow virtual
            traders.
          </p>
          <div className={classes.action}>
            {props.userIsPresent ? (
              <p>
                Hi{" "}
                <span>
                  {JSON.parse(localStorage.getItem("userInfo")).userName}
                </span>
                . It's good to see you!
              </p>
            ) : (
              <button onClick={props.handleRegisterModal}>
                <ul>
                  <li>Register Now</li>
                  <li>
                    <ArrowRightSvg />
                  </li>
                </ul>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={classes["hero__f-container"]}>
        <div ref={figureRef} className={classes["hero__f-container__figure"]}>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
