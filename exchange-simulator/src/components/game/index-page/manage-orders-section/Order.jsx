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

  const UpdateOrderStatus = async (order) => {
    try {
      await axios.patch(
        `${baseUrl}/game/${props.gameName}/order/${order.id}`,
        authorization(localStorage.getItem("token"))
      );

      props.GetOrders();
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
              UpdateOrderStatus(props.order);
            }}
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => {
              UpdateOrderStatus(props.order);
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
