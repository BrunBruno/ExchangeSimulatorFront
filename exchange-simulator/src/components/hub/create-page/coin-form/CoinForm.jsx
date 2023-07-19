import classes from "./CoinForm.module.scss";

function CoinForm(props) {
  return (
    <form onSubmit={props.onAddCoin} className={classes.form}>
      <div className={classes.grid}>
        <h3>
          <span>Select</span> or <span>Create</span>
        </h3>
      </div>
      <div className={classes.grid}>2</div>
      <div className={classes.grid}>
        <div className={classes.row}>
          <span>Coin Name</span>
          <input type="text" placeholder="Super Coin" name="coinName" />
        </div>
        <div className={classes.row}>
          <span>Amount of coins</span>
          <input type="number" placeholder="0" name="amount" step="any" />
        </div>
      </div>

      <div className={classes.grid}>
        <button type="submit">Add</button>

        <button onClick={props.onCoinMenuExpand} type="button">
          Close
        </button>
      </div>
    </form>
  );
}

export default CoinForm;
