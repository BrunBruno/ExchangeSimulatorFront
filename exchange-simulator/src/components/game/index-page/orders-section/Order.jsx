import { showDecimal } from "../../../Shared/functions/extra-functions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./Order.module.scss";

function Order(props) {
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
          Available assets: {showDecimal(props.order.quantity, 4)}{" "}
          {props.order.coinName}
        </p>

        {props.order.orderType == OrderTypes.buy ? (
          <button className={classes.sell}>Sell</button>
        ) : (
          <button className={classes.buy}>Buy</button>
        )}
      </div>
    </div>
  );
}

export default Order;
