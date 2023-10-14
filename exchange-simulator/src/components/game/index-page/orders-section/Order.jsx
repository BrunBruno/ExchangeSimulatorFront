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
  return (
    <div className={classes.order}>
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
    </div>
  );
}

export default Order;
