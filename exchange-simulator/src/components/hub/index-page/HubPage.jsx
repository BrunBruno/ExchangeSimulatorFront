import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import classes from "./HubPage.module.scss";

import Games from "./games-section/Games";
import Header from "../hub-shared/header/Header";
import Intro from "./intro-section/Intro";
import Review from "./review-section/Review";
import Tutorial from "./tutorial-section/Tutorial";
import Ranking from "./ranking-section/Ranking";
import Footer from "./footer/Footer";

function HubPage() {
  const location = useLocation();

  const containerRef = useRef(null);
  const infoPpupRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.popup && infoPpupRef.current) {
      infoPpupRef.current.classList.remove(classes["hidden-popup"]);
      infoPpupRef.current.innerHTML = location.state.popup;

      setTimeout(() => {
        if (infoPpupRef.current) {
          infoPpupRef.current.classList.add(classes["hidden-popup"]);
        }
        setTimeout(() => {
          if (infoPpupRef.current) {
            infoPpupRef.current.innerHTML = "";
          }
        }, 2000);
      }, 3000);

      const updatedState = { ...location.state };
      delete updatedState.popup;

      window.history.replaceState(updatedState, "", location.pathname);
    }
  }, [location.state]);

  return (
    <div ref={containerRef} className={classes.container}>
      <Header containerRef={containerRef} />
      <Intro />
      <Games />
      <Review containerRef={containerRef} />
      <Tutorial />
      <Ranking />
      <Footer containerRef={containerRef} />
      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      ></div>
    </div>
  );
}

export default HubPage;
