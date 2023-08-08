import { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  randomColor,
  showDecimal,
} from "../../../Shared/functions/extra-functions";
import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./Orders.module.scss";

import Order from "./Order";
import LoadingPage from "../../../Shared/pages/loading-page/LoadingPage";

import CoinSvg from "../../../Shared/svgs/CoinSvg";

function Orders(props) {
  const buyListRef = useRef(null);
  const sellListRef = useRef(null);

  const [buyOrders, setBuyOrders] = useState(null);
  const [sellOrders, setSellOrders] = useState(null);
  const [buyOrdersCount, setBuyOrdersCount] = useState(10);
  const [sellOrdersCount, setSellOrdersCount] = useState(10);

  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedType, setSelectedtype] = useState(OrderTypes.buy);
  const [playerInfo, setPlayerInfo] = useState(null);

  useEffect(() => {
    setPlayerInfo(props.playerInfo);
  }, [props.playerInfo]);

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

  if (!sellOrders || !buyOrders || !playerInfo) {
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
          {playerInfo.playerCoins.map((coin, index) => (
            <div
              key={coin.name}
              className={`${classes.coin} ${
                coin.name === selectedCoin ? classes["selected-coin"] : ""
              }`}
              onClick={() => {
                setSelectedCoin(coin.name);
              }}
            >
              {coin.imageUrl ? (
                <img src={coin.imageUrl} alt={coin.name} />
              ) : (
                <CoinSvg color={randomColor(coin.name)} />
              )}

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
            <CoinSvg />
            <span>All</span>
          </div>
        </div>
      </div>
      {window.innerWidth > 800 ? (
        <div className={classes["orders__lists"]}>
          <div ref={buyListRef} className={classes["orders__lists__column"]}>
            <div className={classes["orders__lists__column__list"]}>
              {/* Sell orders in buy column */}
              {sellOrders.map((order) => (
                <Order
                  key={order.id}
                  gameName={props.gameName}
                  order={order}
                  playerInfo={playerInfo}
                />
              ))}
            </div>
          </div>
          <div ref={sellListRef} className={classes["orders__lists__column"]}>
            <div className={classes["orders__lists__column__list"]}>
              {/* Buy orders in sell column */}
              {buyOrders.map((order) => (
                <Order
                  key={order.id}
                  gameName={props.gameName}
                  order={order}
                  playerInfo={playerInfo}
                />
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
                {sellOrders.map((order) => (
                  <Order
                    key={order.id}
                    gameName={props.gameName}
                    order={order}
                    playerInfo={playerInfo}
                  />
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
                {buyOrders.map((order) => (
                  <Order
                    key={order.id}
                    gameName={props.gameName}
                    order={order}
                    playerInfo={playerInfo}
                  />
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
