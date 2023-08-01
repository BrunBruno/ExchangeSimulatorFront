import { useRef } from "react";

import {
  showDecimal,
  showPrecison,
  randomColor,
} from "../../../Shared/functions/extra-functions";

import classes from "./Stats.module.scss";

function Stats(props) {
  return (
    <div className={classes.stats}>
      <div className={classes["stats__content"]}>
        <h3>{props.playerInfo.name}</h3>
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
          {props.playerInfo.tradesQuantity} ( {props.playerInfo.buyTrades}
          <span className={classes.buy}>buy</span>:{" "}
          {props.playerInfo.sellTrades}
          <span className={classes.sell}>sell</span>)
        </p>
        <p>
          <span>Orders created:</span>
          {props.playerInfo.createdOrders} ( {props.playerInfo.buyCreated}
          <span className={classes.buy}>buy</span>:{" "}
          {props.playerInfo.sellCreated}
          <span className={classes.sell}>sell</span>)
        </p>

        <h3>Coins</h3>
        {props.playerInfo.playerCoins.map((coin, index) => {
          const color = randomColor();

          return (
            <div key={index} className={classes.coin}>
              <p>
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
                <span>Available assets: </span>
                {showPrecison(coin.totalBalance)} {coin.name}
              </p>
              <p>
                <span>Locked assets: </span>
                {showPrecison(coin.lockedBalance)} {coin.name}
              </p>
              <p>
                <span>Total turnover: </span>
                {showPrecison(coin.turnOver)} {coin.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
