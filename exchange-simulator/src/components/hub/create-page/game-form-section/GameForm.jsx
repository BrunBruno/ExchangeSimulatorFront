import classes from "./GameForm.module.scss";

import {
  MoneyOptions,
  PlayerOptions,
  DurationOptions,
} from "../CreateGamePageOptions";

import ComboBox from "./ComboBox";

import GameFormIcons from "./GameFormIcons";
import XSvg from "../../../Shared/svgs/XSvg";
import PlusSvg from "../../../Shared/svgs/PlusSvg";

function GameForm(props) {
  return (
    <form onSubmit={props.onCreateNewGame} className={classes.form}>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="name" />
          Name:
        </span>
        <input
          type="text"
          placeholder="New Game"
          name="gameName"
          autoComplete="gameName"
        />
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="password" />
          Password (optional):
        </span>
        <input
          type="password"
          placeholder=""
          name="password"
          autoComplete="password"
        />
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="description" />
          Description (optional):
        </span>
        <textarea
          placeholder="This game is awesome"
          name="description"
        ></textarea>
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="money" />
          Starting money:
        </span>
        <ComboBox name={"money"} options={MoneyOptions} />
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="players" />
          Total (max) number of players:
        </span>
        <ComboBox name={"numberOfPlayers"} options={PlayerOptions} />
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="time" />
          Duration of game:
        </span>
        <ComboBox name={"duration"} options={DurationOptions} />
      </div>
      <div className={classes.row}>
        <span>
          <GameFormIcons name="coins" />
          Selected cons:
        </span>
        <div className={classes["row__list"]}>
          <div className={classes.list} ref={props.coinListRef}>
            {props.coinList.map((coin, index) => (
              <div key={index} className={classes.coin}>
                <img src={coin.imageUrl} />
                {coin.quantity} {coin.name}
                <div
                  className={classes.x}
                  onClick={() => {
                    props.onDeleteCoin(index);
                  }}
                >
                  <XSvg />
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={props.onCoinMenuExpand}
            className={classes["add-button"]}
          >
            <PlusSvg />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default GameForm;
