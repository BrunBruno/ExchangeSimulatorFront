import classes from "./CreateGame.module.scss";

function GameForm(props) {
  return (
    <form onSubmit={props.onCreateNewGame}>
      <div className={classes.row}>
        <div className={classes["row-split"]}>
          <div className={classes["row-split__block"]}>
            <span>Game Name</span>
            <input type="text" placeholder="New Game" name="gameName" />
          </div>
          <div className={classes["row-split__block"]}>
            <span>Game Password</span>
            <input type="password" placeholder="" name="password" />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <span>Description</span>
        <textarea
          placeholder="This game is awesowme"
          name="description"
        ></textarea>
      </div>
      <div className={classes.row}>
        <span>Starting Money</span>
        <div className={classes["row-split"]}>
          <label className={classes.radio}>
            <input type="radio" name="amount" value="1000" />
            <span>$1,000</span>
          </label>

          <label className={classes.radio}>
            <input type="radio" name="amount" value="10000" />
            <span>$10,000</span>
          </label>

          <label className={classes.radio}>
            <input type="radio" name="amount" value="100000" />
            <span>$100,000</span>
          </label>

          <label className={classes.radio}>
            <input type="radio" name="amount" value="1000000" />
            <span>$1,000,000</span>
          </label>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes["row-split"]}>
          <div className={classes["row-split__block"]}>
            <span>End of the Game</span>
            <input type="date" name="endDate" />
          </div>
          <div className={classes["row-split__block"]}>
            <span>Number of players</span>
            <input type="number" placeholder="0" name="numberOfPlayers" />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <span>Coins</span>
        <div className={classes["list-row"]}>
          <div className={classes.list} ref={props.coinListRef}>
            {props.coinList.map((coin, index) => (
              <div key={index} className={classes.coin}>
                {index + 1}. {coin.name}
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    props.onDeleteCoin(index);
                  }}
                >
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#0b7285"
                  />
                </svg>
              </div>
            ))}
          </div>
          <div
            onClick={props.onCoinMenuExpand}
            className={classes["add-button"]}
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" fill="none">
                <g
                  transform="translate(-464.000000, -1087.000000)"
                  fill="#e3fafc"
                >
                  <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <button>Create</button>
      </div>
    </form>
  );
}

export default GameForm;