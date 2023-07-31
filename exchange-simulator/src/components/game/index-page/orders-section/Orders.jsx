import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { showDecimal } from "../../../Shared/functions/extra-functions";
import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./Orders.module.scss";

import Order from "./Order";
import LoadingPage from "../../../Shared/pages/loading-page/LoadingPage";

function Orders(props) {
  const buyListRef = useRef(null);
  const sellListRef = useRef(null);

  const [buyOrders, setBuyOrders] = useState(null);
  const [sellOrders, setSellOrders] = useState(null);
  const [buyOrdersCount, setBuyOrdersCount] = useState(10);
  const [sellOrdersCount, setSellOrdersCount] = useState(10);

  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedType, setSelectedtype] = useState(OrderTypes.buy);

  const GetBuyOrders = async (count) => {
    try {
      const buy = await axios.get(
        `${baseUrl}/game/${props.gameName}/order?orderType=${OrderTypes.buy}&elementsCount=${count}&coinName=${selectedCoin}`,
        authorization(localStorage.getItem("token"))
      );

      setBuyOrders(buy.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const GetSellOrders = async (count) => {
    try {
      const sell = await axios.get(
        `${baseUrl}/game/${props.gameName}/order?orderType=${OrderTypes.sell}&elementsCount=${count}&coinName=${selectedCoin}`,
        authorization(localStorage.getItem("token"))
      );

      setSellOrders(sell.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.connection.on("OrdersChanged", () => {
      GetBuyOrders(buyOrdersCount);
      GetSellOrders(sellOrdersCount);
    });

    return () => {
      props.connection.off("OrdersChanged");
    };
  }, [selectedCoin]);

  useEffect(() => {
    GetBuyOrders(buyOrdersCount);
  }, [buyOrdersCount, selectedCoin]);

  useEffect(() => {
    GetSellOrders(sellOrdersCount);
  }, [sellOrdersCount, selectedCoin]);

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
      <div className={classes["orders__header"]}>
        <h2>
          <p>
            <span className={classes.buy}>Buy</span> Price:{" "}
            {sellOrders && sellOrders.length > 0 && selectedCoin
              ? showDecimal(sellOrders[0].price, 4) + " $-" + selectedCoin
              : "---"}
          </p>
          <p>
            <span className={classes.sell}>Sell</span> Price:{" "}
            {buyOrders && buyOrders.length > 0 && selectedCoin
              ? showDecimal(buyOrders[0].price, 4) + " $-" + selectedCoin
              : "---"}
          </p>
        </h2>
        <div className={classes["orders__header__list"]}>
          {props.playerInfo.playerCoins.map((coin, index) => (
            <div
              key={index}
              className={`${classes.coin} ${
                coin.name === selectedCoin ? classes["selected-coin"] : ""
              }`}
              onClick={() => {
                setSelectedCoin(coin.name);
              }}
            >
              <img src={coin.imageUrl} alt={coin.name} />
              <span>{coin.name}</span>
            </div>
          ))}
          <div
            className={`${classes.coin} ${
              selectedCoin === "" ? classes["selected-coin"] : ""
            }`}
            onClick={() => {
              setSelectedCoin("");
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#fff"
              />
            </svg>
            <span>All</span>
          </div>
        </div>
      </div>
      {window.innerWidth > 800 ? (
        <div className={classes["orders__lists"]}>
          <div ref={buyListRef} className={classes["orders__lists__column"]}>
            <div className={classes["orders__lists__column__list"]}>
              {/* Sell orders in buy column */}
              {sellOrders.map((order, index) => (
                <Order key={index} order={order} />
              ))}
            </div>
          </div>
          <div ref={sellListRef} className={classes["orders__lists__column"]}>
            <div className={classes["orders__lists__column__list"]}>
              {/* Buy orders in sell column */}
              {buyOrders.map((order, index) => (
                <Order key={index} order={order} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={classes["orders__lists"]}>
          {selectedType === OrderTypes.buy ? (
            <div ref={buyListRef} className={classes["orders__lists__column"]}>
              <div
                className={classes["orders__lists__column__change"]}
                onClick={() => {
                  setSelectedtype(OrderTypes.sell);
                }}
              >
                <p className={classes.sell}>See Sell Orders</p>
              </div>
              <div className={classes["orders__lists__column__list"]}>
                {/* Sell orders in buy column */}
                {sellOrders.map((order, index) => (
                  <Order key={index} order={order} />
                ))}
              </div>
            </div>
          ) : (
            <div ref={sellListRef} className={classes["orders__lists__column"]}>
              <div
                className={classes["orders__lists__column__change"]}
                onClick={() => {
                  setSelectedtype(OrderTypes.buy);
                }}
              >
                <p className={classes.buy}>See Buy Orders</p>
              </div>
              <div className={classes["orders__lists__column__list"]}>
                {/* Buy orders in sell column */}
                {buyOrders.map((order, index) => (
                  <Order key={index} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
