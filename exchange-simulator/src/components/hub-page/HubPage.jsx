import classes from "./HubPage.module.scss";
import Bar from "./bar-section/Bar";
import Games from "./games-section/Games";
import Header from "./header-section/Header";
import Intro from "./intro-section/Intro";

function HubPage() {
  return (
    <>
      <div className={classes.container}>
        <Header />
        <Intro />
        <Games />
      </div>
    </>
  );
}

export default HubPage;
