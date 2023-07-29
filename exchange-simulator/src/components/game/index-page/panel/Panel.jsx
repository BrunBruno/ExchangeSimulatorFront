import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import classes from "./Panel.module.scss";

import baseUrl from "../../../Shared/Url";

function Panel(props) {
  const panelRef = useRef(null);
  const formRef = useRef(null);
  const coinListRef = useRef(null);
  const priceErrRef = useRef(null);
  const quantityErrRef = useRef(null);

  const orderTypes = {
    buy: 0,
    sell: 1,
  };

  const [orderType, setOrderType] = useState(-1);
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
        type: parseInt(event.target.type.value),
      };

      if (
        order.type === orderTypes.buy &&
        props.playerInfo.totalBalance - order.price * order.quantity < 0
      ) {
        console.log("Insufficient assets.");
        priceErrRef.current.classList.add(classes.error);
        priceErrRef.current.placeholder = "Insufficient assets.";
        priceErrRef.current.value = "";
        return;
      }

      const coin = props.playerInfo.playerCoins.find(
        (c) => c.id === order.playerCoinId
      );
      if (
        order.type === orderTypes.sell &&
        coin.totalBalance - order.quantity < 0
      ) {
        quantityErrRef.current.classList.add(classes.error);
        quantityErrRef.current.placeholder = "Insufficient assets.";
        quantityErrRef.current.value = "";
        return;
      }

      if (order.price === "") {
        priceErrRef.current.classList.add(classes.error);
        priceErrRef.current.placeholder = "Incorrect value.";
        priceErrRef.current.value = "";
        return;
      }

      if (order.quantity === "") {
        quantityErrRef.current.classList.add(classes.error);
        quantityErrRef.current.placeholder = "Incorrect value.";
        quantityErrRef.current.value = "";
        return;
      }

      await axios.post(`${baseUrl}/order`, order, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearErrors = () => {
    if (priceErrRef.current) {
      priceErrRef.current.classList.remove(classes.error);
      priceErrRef.current.placeholder = "Price:";
    }

    if (quantityErrRef.current) {
      quantityErrRef.current.classList.remove(classes.error);
      quantityErrRef.current.placeholder = "Amount:";
    }
  };

  const onExpandPanel = () => {
    if (panelRef.current) {
      if (panelRef.current.classList.contains(classes["hidden-panel"])) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      } else {
        if (formRef.current.classList.contains(classes["expand-close"])) {
          panelRef.current.classList.add(classes["hidden-panel"]);
        } else {
          formRef.current.classList.add(classes["expand-close"]);
          setTimeout(() => {
            panelRef.current.classList.add(classes["hidden-panel"]);
          }, 300);
        }
      }
    }
  };

  const onOpenOrderForm = (type) => {
    setOrderType(type);
    if (formRef.current) {
      formRef.current.classList.remove(classes["expand-close"]);
    }
  };

  const onCloseOrderFrom = () => {
    setOrderType(-1);
    if (formRef.current) {
      formRef.current.classList.add(classes["expand-close"]);
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
      <div className={classes["panel__button"]} onClick={onExpandPanel}>
        <p>Create</p>
      </div>
      <div
        ref={formRef}
        className={`${classes["panel__expand"]} ${classes["expand-close"]}`}
        onClick={clearErrors}
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

            <div className={classes.icon} onClick={onExpandCoinList}>
              {props.playerInfo.playerCoins[selectedCoin].imageUrl ? (
                <img
                  src={props.playerInfo.playerCoins[selectedCoin].imageUrl}
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#fff"
                  />
                </svg>
              )}
            </div>
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
            ref={priceErrRef}
            placeholder="Price per coin"
            name="price"
            type="number"
            step="any"
          />
          {orderType === 0 ? (
            <input
              ref={quantityErrRef}
              placeholder="Amount"
              name="quantity"
              type="number"
              step="any"
            />
          ) : (
            <input
              ref={quantityErrRef}
              placeholder={`Amount (max: ${props.playerInfo.playerCoins[selectedCoin].totalBalance})`}
              name="quantity"
              type="number"
              step="any"
            />
          )}
          <div className={classes.buttons}>
            <button type="button" onClick={onCloseOrderFrom}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Panel;
