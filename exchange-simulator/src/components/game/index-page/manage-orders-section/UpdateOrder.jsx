import { useRef, useState } from "react";
import axios from "axios";

import { authorization, baseUrl } from "../../../Shared/options/ApiOptions";
import { showPrecison } from "../../../Shared/functions/extra-functions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./UpdateOrder.module.scss";

import CoinSvg from "../../../Shared/svgs/CoinSvg";

function UpdateOrder(props) {
  if (!props.order) {
    return;
  }

  const priceRef = useRef(null);
  const quantityRef = useRef(null);

  const [orderType, setOrderType] = useState(-1);
  const [selectedCoin, setSelectedCoin] = useState(0);

  const [price, setPrice] = useState(props.order.price);
  const [quantity, setQuantity] = useState(props.order.quantity);

  const onOrderUpdate = async (event) => {
    event.preventDefault();

    try {
      const order = {
        gameName: props.gameName,
        orderId: props.order.id,
        price: price,
        quantity: quantity,
      };

      console.log(order);

      if (
        props.order.type === OrderTypes.buy &&
        props.playerInfo.totalBalance +
          props.order.price -
          order.price * order.quantity <
          0
      ) {
        console.log("Insufficient assets.");
        priceRef.current.classList.add(classes.error);
        priceRef.current.placeholder = "Insufficient assets.";
        priceRef.current.value = "";
        return;
      }

      const coin = props.playerInfo.playerCoins.find(
        (c) => c.name === props.order.coinName
      );
      if (
        props.order.type === OrderTypes.sell &&
        coin.totalBalance + props.order.quantity - order.quantity < 0
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

      await axios.put(
        `${baseUrl}/game/${props.gameName}/order/${order.orderId}`,
        order,
        authorization(localStorage.getItem("token"))
      );

      props.GetOrders();
    } catch (err) {
      console.log(err);
    }
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
    if (props.order.type === OrderTypes.buy) {
      if (parseFloat(priceRef.current.value) !== 0) {
        setQuantity(
          showPrecison(
            parseFloat(
              (props.playerInfo.totalBalance + props.order.price) /
                priceRef.current.value
            )
          )
        );
      } else {
        setQuantity(0);
      }
    } else {
      const coinBalance = props.playerInfo.playerCoins.find(
        (c) => c.name === props.order.coinName
      ).totalBalance;
      setQuantity(coinBalance + props.order.quantity);
    }
  };

  return (
    <form className={classes.form} onSubmit={onOrderUpdate}>
      <h2>
        {props.order.type === OrderTypes.buy ? (
          <span className={classes.buy}>Buy</span>
        ) : (
          <span className={classes.sell}>Sell</span>
        )}
        {props.order.coinName}

        <div className={classes.icon}>
          {props.order.coinImageUrl ? (
            <img src={props.order.coinImageUrl} />
          ) : (
            <CoinSvg />
          )}
        </div>
      </h2>
      <div className={classes.input}>
        <input
          ref={priceRef}
          placeholder="Price per coin"
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
        <input
          ref={quantityRef}
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
        <button type="submit">Update</button>
        <button
          type="button"
          onClick={() => {
            props.setSelectedOrder(null);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateOrder;
