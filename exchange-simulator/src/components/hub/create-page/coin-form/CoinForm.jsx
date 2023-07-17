import classes from "./CoinForm.module.scss";

function CoinForm(props) {
  return (
    <form onSubmit={props.onAddCoin} className={classes.form}>
      <div className={classes.row}>
        <div>
          <span>Coin Name</span>
          <input type="text" placeholder="Super Coin" name="coinName" />
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <span>Amount of coins</span>
          <input type="number" placeholder="0" name="amount" step="any" />
        </div>
      </div>
      <div className={classes["button-container"]}>
        <button type="submit">Add</button>
        <button onClick={props.onCoinMenuExpand} type="button">
          Close
        </button>
      </div>
    </form>
  );
}

export default CoinForm;
