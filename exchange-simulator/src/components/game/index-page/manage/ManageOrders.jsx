import { useEffect, useRef, useState } from "react";
import axios from "axios";

import classes from "./ManageOrders.module.scss";

import baseUrl from "../../../Shared/Url";
import LoadingPage from "../../../Shared/LoadingPage";

function ManageOrders(props) {
  const orderTypes = {
    buy: 0,
    sell: 1,
  };

  const contentRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [playerOrders, setPlayerOrders] = useState(null);
  const [selectedType, setSelectedType] = useState(orderTypes.buy);

  const GetOrders = async () => {
    try {
      const orders = await axios.get(
        `${baseUrl}/order/owner-orders?gameName=${props.gameName}&playerId=${props.playerInfo.id}&PageNumber=${pageNumber}&orderType=${selectedType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPlayerOrders(orders.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetOrders();
  }, [selectedType]);

  const onExpandContent = () => {
    if (contentRef.current) {
      if (contentRef.current.classList.contains(classes["hidden-content"])) {
        contentRef.current.classList.remove(classes["hidden-content"]);
      } else {
        contentRef.current.classList.add(classes["hidden-content"]);
      }
    }
  };

  const onSelectType = (event) => {
    setSelectedType(parseInt(event.target.value, 10));
  };

  if (!playerOrders) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.manage}>
      <div className={classes["manage__button"]} onClick={onExpandContent}>
        <p>Orders</p>
      </div>
      <div
        ref={contentRef}
        className={`${classes["manage__content"]} ${classes["hidden-content"]}`}
      >
        <div className={classes["manage__content__header"]}>
          <h2>Your orders: </h2>
          <div className={classes.radios}>
            <label>
              <input
                type="radio"
                value={orderTypes.buy}
                checked={selectedType === orderTypes.buy}
                onChange={onSelectType}
                name="type"
              />
              <span className={classes.buy}>Buy</span>
            </label>
            <label>
              <input
                type="radio"
                value={orderTypes.sell}
                checked={selectedType === orderTypes.sell}
                onChange={onSelectType}
                name="type"
              />
              <span className={classes.sell}>Sell</span>
            </label>
          </div>
        </div>

        <div className={classes["order-list"]}>
          {playerOrders.map((order, index) => (
            <div key={index} className={classes.order}>
              <h3>
                {order.type == orderTypes.buy ? (
                  <span className={classes.buy}>BUY</span>
                ) : (
                  <span className={classes.sell}>SELL</span>
                )}{" "}
                {order.coinName}
                <img src={order.coinImageUrl} />
              </h3>
              <p>
                Price: {order.price} $ / {order.coinName}
              </p>
              <p>
                Amount: {order.quantity} {order.coinName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
