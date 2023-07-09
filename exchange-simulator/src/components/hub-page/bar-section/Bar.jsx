import classes from "./Bar.module.scss";
import BarIcons from "./BarIcons";

function Bar() {
  return (
    <div className={classes.bar}>
      <ul>
        <li>
          <BarIcons name="plus" />
          <span>Create Game</span>
        </li>
        <li>
          <BarIcons name="friend" />
          <span>Invite Friend</span>
        </li>
        <li>
          <BarIcons name="account" />
          <span>Account Details</span>
        </li>
        <li>
          <BarIcons name="ranking" />
          <span>See Ranking</span>
        </li>
        {/* <li>Create Game</li>
        <li>Invite Friend</li>
        <li>Account Details</li>
        <li>See Ranking</li> */}
      </ul>
    </div>
  );
}

export default Bar;
