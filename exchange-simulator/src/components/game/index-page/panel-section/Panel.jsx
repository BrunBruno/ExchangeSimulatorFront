import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { onExpandElement } from "../../../Shared/functions/components-function";
import { showPrecison } from "../../../Shared/functions/extra-functions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./Panel.module.scss";

function Panel(props) {
  const panelRef = useRef(null);
  const formRef = useRef(null);
  const coinListRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  const [orderType, setOrderType] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(
    props.playerInfo.playerCoins[0]
  );

  // inputs options
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // expan panel on start
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
        playerCoinId: selectedCoin.id,
        quantity: parseFloat(event.target.quantity.value),
        price: parseFloat(event.target.price.value),
        type: parseInt(orderType),
      };

      if (
        order.type === OrderTypes.buy &&
        props.playerInfo.totalBalance - order.price * order.quantity < 0
      ) {
        console.log("Insufficient assets.");
        priceRef.current.classList.add(classes.error);
        priceRef.current.placeholder = "Insufficient assets.";
        priceRef.current.value = "";
        return;
      }

      const coin = props.playerInfo.playerCoins.find(
        (c) => c.id === order.playerCoinId
      );
      if (
        order.type === OrderTypes.sell &&
        coin.totalBalance - order.quantity < 0
      ) {
        quantityRef.current.classList.add(classes.error);
        quantityRef.current.placeholder = "Insufficient assets.";
        quantityRef.current.value = "";
        return;
      }

      if (order.price <= 0 || order.price === "" || isNaN(order.price)) {
        priceRef.current.classList.add(classes.error);
        priceRef.current.placeholder = "Incorrect value.";
        priceRef.current.value = "";
        return;
      }

      if (
        order.quantity <= 0 ||
        order.quantity === "" ||
        isNaN(order.quantity)
      ) {
        quantityRef.current.classList.add(classes.error);
        quantityRef.current.placeholder = "Incorrect value.";
        quantityRef.current.value = "";
        return;
      }

      await axios.post(
        `${baseUrl}/game/${props.gameName}/order`,
        order,
        authorization(localStorage.getItem("token"))
      );

      setPrice(0);
      setQuantity(0);

      props.GetOwnerOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const clearErrors = () => {
    if (priceRef.current) {
      priceRef.current.classList.remove(classes.error);
      priceRef.current.placeholder = "Price:";
    }

    if (quantityRef.current) {
      quantityRef.current.classList.remove(classes.error);
      quantityRef.current.placeholder = "Amount:";
    }
  };

  const onExpandPanel = () => {
    // onExpandElement(panelRef, classes["hidden-panel"]);

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
    onExpandElement(coinListRef, classes["hidden-list"]);
  };

  const onChangeInput = (event, set) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      if (event.target.value.length === 2) {
        event.target.value = "";
      }
      set(parseFloat(inputValue));
    } else {
      set(0);
    }
  };

  const onSetMax = () => {
    if (orderType === OrderTypes.buy) {
      if (
        parseFloat(priceRef.current.value) !== 0 &&
        !isNaN(parseFloat(priceRef.current.value))
      ) {
        console.log(true);
        setQuantity(
          showPrecison(
            parseFloat(props.playerInfo.totalBalance / priceRef.current.value)
          )
        );
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(selectedCoin.totalBalance);
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
              onOpenOrderForm(OrderTypes.buy);
            }}
          >
            Buy
          </button>
          <button
            onClick={() => {
              onOpenOrderForm(OrderTypes.sell);
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
            {selectedCoin.name}

            <div className={classes.icon} onClick={onExpandCoinList}>
              {selectedCoin.imageUrl ? (
                <img src={selectedCoin.imageUrl} />
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
                    setSelectedCoin(props.playerInfo.playerCoins[index]);
                    onExpandCoinList();
                  }}
                >
                  <img src={coin.imageUrl} />
                  {coin.name}
                </p>
              ))}
            </div>
          </h2>{" "}
          <div className={classes.input}>
            <p>Price:</p>
            <input
              ref={priceRef}
              placeholder="Price:"
              name="price"
              type="number"
              step="any"
              value={price}
              onChange={(event) => {
                onChangeInput(event, setPrice);
              }}
            />
            <span>$</span>
          </div>
          <div className={classes.input}>
            <p>Amount:</p>
            <input
              ref={quantityRef}
              placeholder="Amount:"
              name="quantity"
              type="number"
              step="any"
              value={quantity}
              onChange={(event) => {
                onChangeInput(event, setQuantity);
              }}
            />
            <span
              className={classes.max}
              onClick={() => {
                onSetMax();
              }}
            >
              MAX
            </span>
          </div>
          <div className={classes.buttons}>
            <button type="submit">Create</button>
            <button type="button" onClick={onCloseOrderFrom}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Panel;
