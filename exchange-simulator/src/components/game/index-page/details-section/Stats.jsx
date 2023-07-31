import { useRef } from "react";

import {
  showDecimal,
  randomColor,
} from "../../../Shared/functions/extra-functions";

import classes from "./Stats.module.scss";

function Stats(props) {
  return (
    <div className={classes.stats}>
      <div className={classes["stats__content"]}>
        <h2>{props.playerInfo.name}</h2>
        <p>
          <span>Available assets: </span>
          {showDecimal(props.playerInfo.totalBalance, 2)} $
        </p>
        <p>
          <span>Locked assets: </span>
          {showDecimal(props.playerInfo.lockedBalance, 2)} $
        </p>
        <p>
          <span>Total turnover: </span>
          {showDecimal(props.playerInfo.turnOver, 2)} $
        </p>
        <p>
          <span>Total trades: </span>
          {props.playerInfo.tradesQuantity}
        </p>
        {props.playerInfo.playerCoins.map((coin, index) => {
          const color = randomColor();

          return (
            <p key={index}>
              {coin.imageUrl ? (
                <img src={coin.imageUrl} alt={coin.name} />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke={color}
                  />
                </svg>
              )}
              {showDecimal(coin.totalBalance, 4)} {coin.name}
              <span>
                {" "}
                ({showDecimal(coin.lockedBalance, 4)} {coin.name} locked)
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
