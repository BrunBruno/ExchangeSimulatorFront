import classes from "./Hero.module.scss";

import { useEffect, useRef } from "react";

function Hero(props) {
  const rotations = [
    "",
    "rotateX(90deg)",
    "rotateX(-90deg)",
    "rotateY(-90deg)",
    "rotateY(90deg)",
    "rotateY(180deg)",
  ];
  const figureRef = useRef(null);

  // resize animated cube
  const handleResize = () => {
    if (figureRef && figureRef.current) {
      const figure = figureRef.current;
      figure.childNodes.forEach((d, i) => {
        const transformSize = figure.offsetWidth / 2;

        // adjust cube
        d.style.transform = `${rotations[i]} translateZ(${
          transformSize * 1.5
        }px)`;

        // adjust cubs walls
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
          <h2>
            Immerse yourself in the dynamic realm of financial markets through
            our exchange simulator game webpage, where you can test your trading
            strategies, learn new techniques, and compete with fellow virtual
            traders.
          </h2>
          <div className={classes.action}>
            <button onClick={props.handleRegisterPopUp}>
              <ul>
                <li>Register Now</li>
                <li>
                  <svg
                    viewBox="-4.5 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none">
                      <g
                        transform="translate(-305.000000, -6679.000000)"
                        fill="#fff"
                      >
                        <g transform="translate(56.000000, 160.000000)">
                          <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </li>
              </ul>
            </button>
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
