import classes from "./HubPage.module.scss";
import Bar from "./bar-section/Bar";
import Games from "./games-section/Games";
import Header from "./header-section/Header";

function HubPage() {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Bar />
        <Games />
      </div>
    </>
  );
}

export default HubPage;
