import { useEffect, useRef, useState } from "react";

import {
  showDecimal,
  showPrecison,
  randomColor,
} from "../../../Shared/functions/extra-functions";

import classes from "./Stats.module.scss";
import CoinSvg from "../../../Shared/svgs/CoinSvg";

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
        {props.playerInfo.playerCoins.map((coin, index) => (
          <div key={coin.name} className={classes.coin}>
            <p>
              {coin.imageUrl ? (
                <img src={coin.imageUrl} alt={coin.name} />
              ) : (
                <CoinSvg color={randomColor(coin.name)} />
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
        ))}
      </div>
    </div>
  );
}

export default Stats;
