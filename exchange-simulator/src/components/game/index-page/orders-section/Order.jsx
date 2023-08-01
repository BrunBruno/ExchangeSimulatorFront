import { useRef, useState } from "react";

import {
  showDecimal,
  showPrecison,
} from "../../../Shared/functions/extra-functions";
import { OrderTypes } from "../GamePageOptions";
import { onExpandElement } from "../../../Shared/functions/components-function";

import classes from "./Order.module.scss";
import axios from "axios";
import { authorization, baseUrl } from "../../../Shared/options/ApiOptions";

function Order(props) {
  const actionRef = useRef(null);
  const inputRef = useRef(null);

  const [actionIsOpen, setActionIsOpen] = useState(false);
  const [value, setValue] = useState(0);

  const onRealizeBuyOrder = async () => {
    const order = {
      quantity: value,
    };

    if (order.quantity <= 0 || isNaN(order.quantity)) {
      return;
    }

    try {
      // realize buy from maker site and sell for crator site
      await axios.put(
        `${baseUrl}/game/${props.gameName}/order/${props.order.id}/sell`,
        order,
        authorization(localStorage.getItem("token"))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onRealizeSellOrder = async () => {
    const order = {
      quantity: value,
    };

    if (order.quantity <= 0 || isNaN(order.quantity)) {
      return;
    }

    try {
      // realize sell from maker site and buy for crator site
      await axios.put(
        `${baseUrl}/game/${props.gameName}/order/${props.order.id}/buy`,
        order,
        authorization(localStorage.getItem("token"))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onExpandAction = () => {
    setActionIsOpen(!actionIsOpen);
    onExpandElement(actionRef, classes["hidden-action"]);
  };

  const onChangeInput = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      if (event.target.value.length === 2) {
        event.target.value = "";
      }
      setValue(parseFloat(inputValue));
    } else {
      setValue(0);
    }
  };

  const onSetMax = () => {
    setValue(showPrecison(props.order.quantity));
  };

  return (
    <div className={classes.order}>
      <div className={classes["order__header"]}>
        <h3>
          {props.order.orderType == OrderTypes.buy ? (
            <span className={classes.sell}>Sell</span>
          ) : (
            <span className={classes.buy}>Buy</span>
          )}
          <img src={props.order.coinImage} />
        </h3>
        <p>
          Price: {showDecimal(props.order.price, 2)} $ / {props.order.coinName}
        </p>
        <p>
          Coins: {showPrecison(props.order.quantity)} {props.order.coinName}
        </p>
        {value ? (
          props.order.orderType === OrderTypes.buy ? (
            <button className={classes.sell} onClick={onRealizeSellOrder}>
              Sell
            </button>
          ) : (
            <button className={classes.buy} onClick={onRealizeBuyOrder}>
              Buy
            </button>
          )
        ) : !actionIsOpen ? (
          props.order.orderType === OrderTypes.buy ? (
            <button className={classes.sell} onClick={onExpandAction}>
              Sell
            </button>
          ) : (
            <button className={classes.buy} onClick={onExpandAction}>
              Buy
            </button>
          )
        ) : (
          <button onClick={onExpandAction}>Hide</button>
        )}
      </div>
      <div
        ref={actionRef}
        className={`${classes["order__action"]} ${classes["hidden-action"]}`}
      >
        <div className={classes.input}>
          <p>Coins amount:</p>
          <input
            type="number"
            step="any"
            value={value}
            onChange={(event) => {
              onChangeInput(event);
            }}
          />
          <span className={classes.max} onClick={onSetMax}>
            MAX
          </span>
        </div>
      </div>
    </div>
  );
}

export default Order;
