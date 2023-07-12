import classes from "./HubPage.module.scss";

import Games from "./games-section/Games";
import Header from "../header-shared/Header";
import Intro from "./intro-section/Intro";
import Review from "./review-section/Review";
import Tutorial from "./tutorial-section/Tutorial";
import Ranking from "./ranking-section/Ranking";
import { useRef } from "react";

function HubPage() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={classes.container}>
      <Header />
      <Intro />
      <Games />
      <Review containerRef={containerRef} />
      <Tutorial />
      <Ranking />
    </div>
  );
}

export default HubPage;
