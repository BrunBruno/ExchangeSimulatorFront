import classes from "./HubPage.module.scss";

import Games from "./games-section/Games";
import Header from "../header-shared/Header";
import Intro from "./intro-section/Intro";

function HubPage() {
  return (
    <div className={classes.container}>
      <Header />
      <Intro />
      <Games />
    </div>
  );
}

export default HubPage;
