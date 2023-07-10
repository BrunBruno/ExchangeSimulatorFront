import classes from "./CreateGame.module.scss";

function CoinForm(props) {
  return (
    <form onSubmit={props.onAddCoin}>
      <div className={classes.row}>
        <div className={classes["row-split"]}>
          <div>
            <span>Coin Name</span>
            <input type="text" placeholder="Super Coin" name="coinName" />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes["row-split"]}>
          <div>
            <span>Amount of coins</span>
            <input type="number" placeholder="0" name="amount" step="any" />
          </div>
        </div>
      </div>
      <div className={classes["button-container"]}>
        <button>Add</button>
        <button onClick={props.onCoinMenuExpand} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CoinForm;
