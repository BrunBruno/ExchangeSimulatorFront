import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { onExpandElement } from "../../../Shared/functions/components-function";
import { OrderTypes } from "../GamePageOptions";

import classes from "./Panel.module.scss";
import CoinSvg from "../../../Shared/svgs/CoinSvg";
import { randomColor } from "../../../Shared/functions/extra-functions";

function Panel(props) {
  // expan elements refs
  const panelRef = useRef(null);
  const formRef = useRef(null);
  const coinListRef = useRef(null);

  // inputs refs
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  // order options
  const [orderType, setOrderType] = useState(-1);

  // player info states
  const [playerInfo, setPlayerInfo] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    setPlayerInfo(props.playerInfo);
    setSelectedCoin(props.playerInfo.playerCoins[0]);
  }, [props.playerInfo]);

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
        playerInfo.totalBalance - order.price * order.quantity < 0
      ) {
        console.log("Insufficient assets.");
        priceRef.current.classList.add(classes.error);
        priceRef.current.placeholder = "Insufficient assets.";
        priceRef.current.value = "";
        return;
      }

      const coin = playerInfo.playerCoins.find(
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
        setQuantity(
          parseFloat(playerInfo.totalBalance / priceRef.current.value)
        );
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(selectedCoin.totalBalance);
    }
  };

  if (!playerInfo || !selectedCoin) {
    return;
  }

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
                <CoinSvg color={randomColor(selectedCoin.name)} />
              )}
            </div>
            <div
              ref={coinListRef}
              className={`${classes["coin-list"]} ${classes["hidden-list"]}`}
            >
              {playerInfo.playerCoins.map((coin, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedCoin(playerInfo.playerCoins[index]);
                    onExpandCoinList();
                  }}
                >
                  {coin.imageUrl ? (
                    <img src={coin.imageUrl} />
                  ) : (
                    <span className={classes.coin}>
                      <CoinSvg color={randomColor(coin.name)} />
                    </span>
                  )}
                  {coin.name}
                </p>
              ))}
            </div>
          </h2>
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
