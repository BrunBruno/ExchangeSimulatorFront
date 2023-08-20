import { OrderTypes, OrderStatus } from "../GamePageOptions";

import classes from "./Order.module.scss";

import FreezeSvg from "../../../Shared/svgs/FreezeSvg";
import axios from "axios";
import { authorization, baseUrl } from "../../../Shared/options/ApiOptions";
import { showPrecison } from "../../../Shared/functions/extra-functions";

function Order(props) {
  const CloseOrder = async (order) => {
    try {
      await axios.delete(
        `${baseUrl}/game/${props.gameName}/order/${order.id}`,
        authorization(localStorage.getItem("token"))
      );

      props.GetOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const FreezeOrder = async () => {
    try {
      await axios.patch(
        `${baseUrl}/game/${props.gameName}/order/${props.order.id}/freeze`,
        {},
        authorization(localStorage.getItem("token"))
      );

      props.GetOrders();

      props.setPopupContent("Unpublished.");
    } catch (err) {
      console.log(err);
    }
  };

  const onOrderUpdate = async () => {
    try {
      const order = {
        gameName: props.gameName,
        orderId: props.order.id,
        price: props.order.price,
        quantity: props.order.quantity,
      };

      if (
        props.order.type === OrderTypes.buy &&
        props.playerInfo.totalBalance +
          props.order.price -
          order.price * order.quantity <
          0
      ) {
        props.setPopupContent("Can not publish.");
        return;
      }

      const coin = props.playerInfo.playerCoins.find(
        (c) => c.name === props.order.coinName
      );
      if (
        props.order.type === OrderTypes.sell &&
        coin.totalBalance + props.order.quantity - order.quantity < 0
      ) {
        props.setPopupContent("Can not publish.");
        return;
      }

      if (order.price <= 0 || order.price === "" || isNaN(order.price)) {
        props.setPopupContent("Can not publish.");
        return;
      }

      if (
        order.quantity <= 0 ||
        order.quantity === "" ||
        isNaN(order.quantity)
      ) {
        props.setPopupContent("Can not publish.");
        return;
      }

      await axios.put(
        `${baseUrl}/game/${props.gameName}/order/${order.orderId}/${
          props.order.type === OrderTypes.buy ? "limit-buy" : "limit-sell"
        }`,
        order,
        authorization(localStorage.getItem("token"))
      );

      props.GetOrders();

      props.setPopupContent("Published.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.order}>
      {props.order.status === OrderStatus.freeze ? (
        <div className={classes.freeze}>
          <FreezeSvg />
        </div>
      ) : (
        ""
      )}
      <h3>
        {props.order.type == OrderTypes.buy ? (
          <span className={classes.buy}>BUY</span>
        ) : (
          <span className={classes.sell}>SELL</span>
        )}{" "}
        {props.order.coinName}
        <img src={props.order.coinImageUrl} />
      </h3>
      <p>
        Price: {showPrecison(props.order.price)} $ / {props.order.coinName}
      </p>
      <p>
        Amount: {showPrecison(props.order.quantity)} {props.order.coinName}
      </p>
      <div className={classes.buttons}>
        {props.order.status === OrderStatus.freeze ? (
          <button
            onClick={() => {
              onOrderUpdate();
            }}
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => {
              FreezeOrder();
            }}
          >
            Unpublish
          </button>
        )}
        <button
          onClick={() => {
            props.onSelectOrder(props.order);
          }}
        >
          Change
        </button>
        <button
          onClick={() => {
            CloseOrder(props.order);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Order;
