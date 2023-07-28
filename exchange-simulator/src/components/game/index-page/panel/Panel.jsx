import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import classes from "./Panel.module.scss";

import baseUrl from "../../../Shared/Url";

function Panel(props) {
  const panelRef = useRef(null);
  const formRef = useRef(null);
  const coinListRef = useRef(null);

  const orderTypes = {
    buy: 0,
    sell: 1,
  };

  const [orderType, setOrderType] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      }
    }, 1000);
  }, []);

  const onOrderCreate = async (event) => {
    event.preventDefault();

    try {
      const order = {
        gameName: event.target.gameName.value,
        playerCoinId: event.target.playerCoinId.value,
        quantity: event.target.quantity.value,
        price: event.target.price.value,
        type: event.target.type.value,
      };

      console.log(order);
      return;

      await axios.post(`${baseUrl}/order`, order, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onExpandPanel = () => {
    if (panelRef.current) {
      if (panelRef.current.classList.contains(classes["hidden-panel"])) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      } else {
        formRef.current.classList.add(classes["expand-close"]);
        setTimeout(() => {
          panelRef.current.classList.add(classes["hidden-panel"]);
        }, 300);
      }
    }
  };

  const onOpenOrderForm = (type) => {
    setOrderType(type);
    if (formRef.current) {
      formRef.current.classList.remove(classes["expand-close"]);
    }
  };

  const onExpandCoinList = () => {
    if (coinListRef.current) {
      if (coinListRef.current.classList.contains(classes["hidden-list"])) {
        coinListRef.current.classList.remove(classes["hidden-list"]);
      } else {
        coinListRef.current.classList.add(classes["hidden-list"]);
      }
    }
  };

  return (
    <div className={classes.panel}>
      <div
        className={`${classes["panel__actions"]} ${classes["hidden-panel"]}`}
        ref={panelRef}
      >
        <h1>Create Order!</h1>
        <div className={classes.buttons}>
          <button
            onClick={() => {
              onOpenOrderForm(orderTypes.buy);
            }}
          >
            Buy
          </button>
          <button
            onClick={() => {
              onOpenOrderForm(orderTypes.sell);
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <div className={classes["panel__button"]} onClick={onExpandPanel}></div>
      <div
        ref={formRef}
        className={`${classes["panel__expand"]} ${classes["expand-close"]}`}
      >
        <div />
        <form className={classes.form} onSubmit={onOrderCreate}>
          <h2>
            {orderType === 0 ? (
              <span className={classes.buy}>Buy</span>
            ) : (
              <span className={classes.sell}>Sell</span>
            )}
            {props.playerInfo.playerCoins[selectedCoin].name}
            <img
              src={props.playerInfo.playerCoins[selectedCoin].imageUrl}
              onClick={onExpandCoinList}
            />
            <div
              ref={coinListRef}
              className={`${classes["coin-list"]} ${classes["hidden-list"]}`}
            >
              {props.playerInfo.playerCoins.map((coin, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedCoin(index);
                    onExpandCoinList();
                  }}
                >
                  <img src={coin.imageUrl} />
                  {coin.name}
                </p>
              ))}
            </div>
          </h2>
          <input
            className={classes["hidden-input"]}
            value={props.gameName}
            name="gameName"
            onChange={() => {}}
          />
          <input
            className={classes["hidden-input"]}
            value={orderType}
            name="type"
            onChange={() => {}}
          />
          <input
            className={classes["hidden-input"]}
            value={props.playerInfo.playerCoins[selectedCoin].id}
            name="playerCoinId"
            onChange={() => {}}
          />
          <input
            placeholder="Price per coin"
            name="price"
            type="number"
            step="any"
          />
          {orderType === 0 ? (
            <input
              placeholder="Amount"
              name="quantity"
              type="number"
              step="any"
            />
          ) : (
            <input
              placeholder={`Amount (max: ${props.playerInfo.playerCoins[selectedCoin].quantity})`}
              name="quantity"
              type="number"
              step="any"
            />
          )}

          <button>Create</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
