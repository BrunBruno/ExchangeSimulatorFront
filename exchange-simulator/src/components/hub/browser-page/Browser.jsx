import { useLocation } from "react-router-dom";
import classes from "./Browser.module.scss";

import Card from "./Card";
import Details from "./Details";
import Header from "../header-shared/Header";

function Browser() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <div className={classes.browser}>
        <Card title={location.state.title} />
        <Details />
      </div>
    </div>
  );
}

export default Browser;
