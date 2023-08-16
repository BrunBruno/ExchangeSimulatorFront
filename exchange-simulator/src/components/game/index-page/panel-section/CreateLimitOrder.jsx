import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { onExpandElement } from "../../../Shared/functions/components-function";
import { OrderTypes } from "../GamePageOptions";
import { randomColor } from "../../../Shared/functions/extra-functions";

import panelClasses from "./Panel.module.scss";
import classes from "./CreateLimitOrder.module.scss";

import CoinSvg from "../../../Shared/svgs/CoinSvg";

function CreateLimitOrder(props) {
  // expan elements refs
  const coinListRef = useRef(null);

  // inputs refs
  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  // order options
  const [orderType, setOrderType] = useState(OrderTypes.buy);

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

      const response = await axios.post(
        `${baseUrl}/game/${props.gameName}/order/${
          orderType === OrderTypes.buy ? "limit-buy" : "limit-sell"
        }`,
        order,
        authorization(localStorage.getItem("token"))
      );

      const transations = await axios.get(
        `${baseUrl}/game/${props.gameName}/transaction/realized/${response.data}`,
        authorization(localStorage.getItem("token"))
      );

      setPrice(0);
      setQuantity(0);

      props.GetOwnerOrders();

      props.setPopupContent("Order created");

      props.setTransactionsInfo(transations.data);
      console.log(transations);
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

  const onOpenOrderForm = (type) => {
    setOrderType(type);
    if (props.limitFormRef.current) {
      props.limitFormRef.current.classList.remove(panelClasses["expand-close"]);
    }
  };

  const onCloseOrderFrom = () => {
    setOrderType(-1);
    if (props.limitFormRef.current) {
      props.limitFormRef.current.classList.add(panelClasses["expand-close"]);
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
    <div
      ref={props.limitRef}
      className={`${panelClasses["hidden-panel"]} ${panelClasses["limit-hidden"]} ${classes.limit}`}
    >
      <div className={`${classes.actions} ${panelClasses.actions}`}>
        <h1>Create Order</h1>
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
      <div
        className={classes.hanlder}
        onClick={() => {
          props.onExpandPanel(
            props.limitRef,
            props.marketRef,
            props.limitFormRef,
            props.marketFormRef
          );
        }}
      >
        <p>Create</p>
      </div>
      <div
        ref={props.limitFormRef}
        className={`${classes.expand} ${panelClasses["expand-close"]}`}
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

export default CreateLimitOrder;
