import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { onExpandElement } from "../../../Shared/functions/components-function";
import { OrderTypes } from "../GamePageOptions";
import { randomColor } from "../../../Shared/functions/extra-functions";

import panelClasses from "./Panel.module.scss";
import classes from "./CreateMarketOrder.module.scss";

import CoinSvg from "../../../Shared/svgs/CoinSvg";

function CreateMarketOrder(props) {
  // expan elements refs
  const coinListRef = useRef(null);

  // inputs refs
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
  const [quantity, setQuantity] = useState(0);

  const onOrderCreate = async (event) => {
    event.preventDefault();

    try {
      const order = {
        playerCoinId: selectedCoin.id,
        quantity: parseFloat(event.target.quantity.value),
        type: parseInt(orderType),
      };

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

      await axios.put(
        `${baseUrl}/game/${props.gameName}/order/${
          orderType === OrderTypes.buy ? "market-buy" : "market-sell"
        }`,
        order,
        authorization(localStorage.getItem("token"))
      );

      setQuantity(0);

      props.GetOwnerOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const clearErrors = () => {
    if (quantityRef.current) {
      quantityRef.current.classList.remove(classes.error);
      quantityRef.current.placeholder = "Amount:";
    }
  };

  const onOpenOrderForm = (type) => {
    setOrderType(type);
    if (props.marketFormRef.current) {
      props.marketFormRef.current.classList.remove(
        panelClasses["expand-close"]
      );
    }
  };

  const onCloseOrderFrom = () => {
    setOrderType(-1);
    if (props.marketFormRef.current) {
      props.marketFormRef.current.classList.add(panelClasses["expand-close"]);
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
      setQuantity(0);
    } else {
      setQuantity(selectedCoin.totalBalance);
    }
  };

  if (!playerInfo || !selectedCoin) {
    return;
  }
  return (
    <div
      ref={props.marketRef}
      className={`${panelClasses["hidden-panel"]} ${panelClasses["market-hidden"]} ${classes.market}`}
    >
      <div className={`${classes.actions} ${panelClasses.actions}`}>
        <h1>Quick Order</h1>
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
            props.marketRef,
            props.limitRef,
            props.marketFormRef,
            props.limitFormRef
          );
        }}
      >
        <p>Quick</p>
      </div>
      <div
        ref={props.marketFormRef}
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

export default CreateMarketOrder;
