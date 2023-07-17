import { useNavigate } from "react-router-dom";
import classes from "./Bar.module.scss";
import BarIcons from "./BarIcons";

function Bar() {
  const navigate = useNavigate();

  return (
    <div className={classes.bar}>
      <ul>
        <li onClick={() => navigate("/hub/create")}>
          <BarIcons name="plus" />
          <span>Create Game</span>
        </li>
        <li onClick={() => navigate("/hub/manage")}>
          <BarIcons name="games" />
          <span>Your Games</span>
        </li>
        <li>
          <BarIcons name="account" />
          <span>Account Details</span>
        </li>
        <li>
          <BarIcons name="ranking" />
          <span>See Ranking</span>
        </li>
      </ul>
    </div>
  );
}

export default Bar;
