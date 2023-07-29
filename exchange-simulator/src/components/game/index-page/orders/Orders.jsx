import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Orders.module.scss";

import baseUrl from "../../../Shared/Url";
import Order from "./Order";
import LoadingPage from "../../../Shared/LoadingPage";

function Orders(props) {
  const orderTypes = {
    buy: 0,
    sell: 1,
  };

  const [buyOrders, setBuyOrders] = useState(null);
  const [sellOrders, setSellOrders] = useState(null);

  const GetOrders = async () => {
    try {
      const buy = await axios.get(
        `${baseUrl}/order?gameName=${props.gameName}&OrderType=${orderTypes.buy}&pageNumber=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBuyOrders(buy.data.items);

      const sell = await axios.get(
        `${baseUrl}/order?gameName=${props.gameName}&OrderType=${orderTypes.sell}&pageNumber=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSellOrders(sell.data.items);

      console.log(sell.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetOrders();
  }, []);

  if (!sellOrders || !buyOrders) {
    return <LoadingPage />;
  }
  return (
    <div className={classes.orders}>
      <div className={classes["orders__column"]}>
        {/* Sell orders in buy column */}
        {sellOrders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
      <div className={classes["orders__column"]}>
        {/* Buy orders in sell column */}
        {buyOrders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
