import classes from "./Hero.module.scss";

import { useEffect, useRef } from "react";

function Hero() {
  const rotations = [
    "",
    "rotateX(90deg)",
    "rotateX(-90deg)",
    "rotateY(-90deg)",
    "rotateY(90deg)",
    "rotateY(180deg)",
  ];
  const figureRef = useRef(null);
  const handleResize = () => {
    if (figureRef && figureRef.current) {
      const figure = figureRef.current;
      figure.childNodes.forEach((d, i) => {
        const transformSize = figure.offsetWidth / 2;

        d.style.transform = `${rotations[i]} translateZ(${
          transformSize * 1.5
        }px)`;
        d.childNodes.forEach((p, i) => {
          if (i !== 0 && i !== d.childNodes.length - 1) {
            p.style.transform = `${rotations[i]} translateZ(${transformSize}px)`;
          }
        });
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.hero}>
      <div className={classes["hero__content"]}>
        <div className={classes["hero__content__intro"]}>
          <h1>
            Welcome to <br /> Exchnage Simulatore
          </h1>
          <h2>
            Immerse yourself in the dynamic realm of financial markets through
            our exchange simulator game webpage, where you can test your trading
            strategies, learn new techniques, and compete with fellow virtual
            traders.
          </h2>
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
