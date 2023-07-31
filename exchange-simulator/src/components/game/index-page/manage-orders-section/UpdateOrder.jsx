import { useRef, useState } from "react";

import { OrderTypes } from "../GamePageOptions";

import classes from "./UpdateOrder.module.scss";

import CoinSvg from "../../../Shared/svgs/CoinSvg";

function UpdateOrder(props) {
  const priceErrRef = useRef(null);
  const quantityErrRef = useRef(null);

  const [orderType, setOrderType] = useState(-1);
  const [selectedCoin, setSelectedCoin] = useState(0);

  const onOrderUpdate = (event) => {
    event.preventDefault();
  };

  if (!props.order) {
    return;
  }

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
      <input
        className={classes["hidden-input"]}
        value={props.order.id}
        name="orderId"
        onChange={() => {}}
      />
      <input
        ref={priceErrRef}
        placeholder="Price per coin"
        name="price"
        type="number"
        step="any"
        defaultValue={props.order.price}
      />
      {orderType === 0 ? (
        <input
          ref={quantityErrRef}
          placeholder="Amount"
          name="quantity"
          type="number"
          step="any"
          defaultValue={props.order.quantity}
        />
      ) : (
        <input
          ref={quantityErrRef}
          placeholder={`Amount (max: ${props.playerInfo.playerCoins[selectedCoin].totalBalance})`}
          name="quantity"
          type="number"
          step="any"
          defaultValue={props.order.quantity}
        />
      )}
      <div className={classes.buttons}>
        <button
          type="button"
          onClick={() => {
            props.setSelectedOrder(null);
          }}
        >
          Cancel
        </button>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default UpdateOrder;
