import { useRef } from "react";

import usePopup from "../../Shared/hooks/usePopup ";

import classes from "./HubPage.module.scss";

import Games from "./games-section/Games";
import Header from "../hub-shared/header/Header";
import Intro from "./intro-section/Intro";
import Review from "./review-section/Review";
import Tutorial from "./tutorial-section/Tutorial";
import Ranking from "./ranking-section/Ranking";
import Footer from "./footer-section/Footer";

function HubPage() {
  const containerRef = useRef(null);

  // popup options
  const [infoPpupRef, popupContent, setPopupContent] = usePopup(
    classes["hidden-popup"]
  );

  return (
    <div ref={containerRef} className={classes.container}>
      <Header containerRef={containerRef} />
      <Intro />
      <Games />
      <Review containerRef={containerRef} setPopupContent={setPopupContent} />
      <Tutorial />
      <Ranking />
      <Footer containerRef={containerRef} />
      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      >
        {popupContent}
      </div>
    </div>
  );
}

export default HubPage;
