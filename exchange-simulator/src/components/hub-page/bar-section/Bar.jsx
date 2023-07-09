import classes from "./Bar.module.scss";

function Bar() {
  return (
    <div className={classes.bar}>
      <ul>
        <li>Create Game</li>
        <li>Invite Friend</li>
        <li>Account Details</li>
        <li>See Ranking</li>
      </ul>
    </div>
  );
}

export default Bar;
