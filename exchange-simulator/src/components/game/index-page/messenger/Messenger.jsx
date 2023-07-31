import { useRef } from "react";

import {
  showDecimal,
  randomColor,
} from "../../../Shared/functions/extra-functions";
import { onExpandElement } from "../../../Shared/functions/components-function";

import classes from "./Messenger.module.scss";

function Messenger(props) {
  const messengerRef = useRef(null);

  const onOpenMessenger = () => {
    onExpandElement(messengerRef, classes["close"]);
  };

  return (
    <div className={classes.messenger}>
      <div className={classes.stats}>
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
      <div
        ref={messengerRef}
        className={`${classes["messenger__content"]} ${classes.close}`}
      >
        <div className={classes.elements}>
          <div className={classes["elements__messages"]}>
            <div className={classes.message}>aaa</div>
            <div className={classes.message}>aaa</div>
            <div className={`${classes.message} ${classes.own}`}>aaa</div>
            <div className={classes.message}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              assumenda numquam nesciunt consequatur, optio sint corporis alias
              quisquam animi recusandae nobis doloremque natus dolorum odio
              sapiente aspernatur ratione? Doloremque, obcaecati.
            </div>
            <div className={`${classes.message} ${classes.own}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quibusdam enim maiores eius ut? Eos sunt quia dolores repellendus
              aliquid voluptatibus beatae nobis nam, consequuntur blanditiis
              sint! Repellat, inventore consequatur!
            </div>
            <div className={`${classes.message} ${classes.own}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quibusdam enim maiores eius ut? Eos sunt quia dolores repellendus
              aliquid voluptatibus beatae nobis nam, consequuntur blanditiis
              sint! Repellat, inventore consequatur!
            </div>
          </div>
          <div className={classes["elements__panel"]}>
            <input placeholder="Message:" />
            <button>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["sent-icon"]}
              >
                <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" />
              </svg>
            </button>
          </div>
        </div>
        <svg
          onClick={onOpenMessenger}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classes["mess-icon"]}
        >
          <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" />
        </svg>
      </div>
    </div>
  );
}

export default Messenger;
