import { GameStatus } from "../ManageGamePageOptions";
import { makeDate } from "../../../Shared/functions/extra-functions";

import classes from "./Card.module.scss";

import RoundArrowRightSvg from "../../../Shared/svgs/RoundArrowRightSvg";

function Card(props) {
  return (
    <div className={classes.card}>
      <div className={classes["card__column"]}>
        <div className={classes.arrow}>
          <RoundArrowRightSvg />
        </div>
        <h3>{props.game.name}</h3>
        <h5>
          {props.game.status === GameStatus.available ? (
            <span className={classes.available}>Available</span>
          ) : props.game.status === GameStatus.active ? (
            <span className={classes.active}>Active</span>
          ) : (
            <span className={classes.finished}>Finished</span>
          )}
        </h5>
      </div>
      <div className={classes["card__column"]}>
        <span className={classes.date}>{makeDate(props.game.createdAt)}</span>
        {props.game.status === GameStatus.available ? (
          <>
            <p>Players:</p>
            <div className={classes.indicator}>
              <div
                className={classes["indicator__fill"]}
                style={{ width: `${props.game.playersRatio}%` }}
              />
            </div>
          </>
        ) : props.game.status === GameStatus.active ? (
          <>
            <p>Time:</p>
            <div className={classes.indicator}>
              <div
                className={classes["indicator__fill"]}
                style={{ width: `${props.game.timeRatio}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <p>Finished at:</p>
            <p>Winner:</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
