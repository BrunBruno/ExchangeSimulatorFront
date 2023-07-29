import { useEffect, useRef, useState } from "react";
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

  const buyListRef = useRef(null);
  const sellListRef = useRef(null);

  const [buyOrders, setBuyOrders] = useState(null);
  const [sellOrders, setSellOrders] = useState(null);
  const [buyOrdersCount, setBuyOrdersCount] = useState(10);
  const [sellOrdersCount, setSellOrdersCount] = useState(10);
  const [totalBuyOrderssCount, setTotalBuyOrderssCount] = useState(0);
  const [totalSellOrderssCount, setTotalSellOrderssCount] = useState(0);

  const GetBuyOrders = async (count) => {
    if (totalBuyOrderssCount > 0 && count > totalBuyOrderssCount) {
      count = totalBuyOrderssCount;
    }

    try {
      const buy = await axios.get(
        `${baseUrl}/order?gameName=${props.gameName}&OrderType=${orderTypes.buy}&elementsCount=${count}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBuyOrders(buy.data.items);
      setTotalBuyOrderssCount(buy.data.totalItemsCount);
    } catch (err) {
      console.log(err);
    }
  };

  const GetSellOrders = async (count) => {
    if (totalSellOrderssCount > 0 && count > totalSellOrderssCount) {
      count = totalSellOrderssCount;
    }

    try {
      const sell = await axios.get(
        `${baseUrl}/order?gameName=${props.gameName}&OrderType=${orderTypes.sell}&elementsCount=${count}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSellOrders(sell.data.items);
      setTotalSellOrderssCount(sell.data.totalItemsCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetBuyOrders(buyOrdersCount);
  }, [buyOrdersCount]);

  useEffect(() => {
    GetSellOrders(sellOrdersCount);
  }, [sellOrdersCount]);

  props.connection.on("OrdersChanged", () => {
    GetBuyOrders(buyOrdersCount);
    GetSellOrders(sellOrdersCount);
  });

  const handleOrdersScroll = (event) => {
    const scrollTop = buyListRef.current.scrollTop;
    const scrollHeight = buyListRef.current.scrollHeight;
    const clientHeight = buyListRef.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      if (event.target === buyListRef.current) {
        // update sell list when srcoll on buy column
        setSellOrdersCount((prevCount) => prevCount + 10);
      } else if (event.target === sellListRef.current) {
        // update buy list when srcoll on sell column
        setBuyOrdersCount((prevCount) => prevCount + 10);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (sellListRef.current) {
        sellListRef.current.addEventListener("scroll", handleOrdersScroll);
      }
      if (buyListRef.current) {
        buyListRef.current.addEventListener("scroll", handleOrdersScroll);
      }
    }, 100);
  }, []);

  if (!sellOrders || !buyOrders) {
    return <LoadingPage />;
  }
  return (
    <div className={classes.orders}>
      <div ref={buyListRef} className={classes["orders__column"]}>
        {/* Sell orders in buy column */}
        {sellOrders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
      <div ref={sellListRef} className={classes["orders__column"]}>
        {/* Buy orders in sell column */}
        {buyOrders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
