import classes from "./HubPage.module.scss";
import Games from "./games-section/Games";
import Header from "./header-section/Header";

function HubPage() {
  return (
    <div className={classes.container}>
      <Header />
      <Games />
    </div>
  );
}

export default HubPage;
