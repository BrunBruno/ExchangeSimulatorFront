import { useLocation } from "react-router-dom";
import classes from "./Browser.module.scss";

import Card from "./Card";

function Browser() {
  const location = useLocation();

  return (
    <div className={classes.browser}>
      <Card title={location.state.title} />
    </div>
  );
}

export default Browser;
