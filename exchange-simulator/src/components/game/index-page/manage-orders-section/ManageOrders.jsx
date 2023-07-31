import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";

import { onExpandElement } from "../../../Shared/functions/components-function";
import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { OrderTypes } from "../GamePageOptions";

import classes from "./ManageOrders.module.scss";

import LoadingPage from "../../../Shared/pages/loading-page/LoadingPage";
import UpdateOrder from "./UpdateOrder";

const ManageOrders = forwardRef((props, ref) => {
  const contentRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [playerOrders, setPlayerOrders] = useState(null);
  const [selectedType, setSelectedType] = useState(OrderTypes.buy);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const GetOrders = async () => {
    try {
      const orders = await axios.get(
        `${baseUrl}/game/${props.gameName}/order/owner-orders?&playerId=${props.playerInfo.id}&PageNumber=${pageNumber}&orderType=${selectedType}`,
        authorization(localStorage.getItem("token"))
      );

      setPlayerOrders(orders.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useImperativeHandle(ref, () => {
    GetOrders();
  });

  useEffect(() => {
    GetOrders();
  }, [selectedType]);

  const onExpandContent = () => {
    onExpandElement(contentRef, classes["hidden-content"]);
  };

  const onSelectType = (event) => {
    setSelectedType(parseInt(event.target.value, 10));
  };

  const onSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const CloseOrder = async (order) => {
    try {
      await axios.delete(
        `${baseUrl}/game/${props.gameName}/order/${order.id}`,
        authorization(localStorage.getItem("token"))
      );

      GetOrders();
    } catch (err) {
      console.log(err);
    }
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
        <div
          className={`${classes["manage__content__update"]} ${
            selectedOrder ? "" : classes["hidden-update"]
          }`}
        >
          <UpdateOrder
            order={selectedOrder}
            playerInfo={props.playerInfo}
            setSelectedOrder={setSelectedOrder}
          />
        </div>
        <div className={classes["manage__content__header"]}>
          <h2>Your orders: </h2>
          <div className={classes.radios}>
            <label>
              <input
                type="radio"
                value={OrderTypes.buy}
                checked={selectedType === OrderTypes.buy}
                onChange={onSelectType}
                name="type"
              />
              <span className={classes.buy}>Buy</span>
            </label>
            <label>
              <input
                type="radio"
                value={OrderTypes.sell}
                checked={selectedType === OrderTypes.sell}
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
                {order.type == OrderTypes.buy ? (
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
              <div className={classes.buttons}>
                <button
                  onClick={() => {
                    onSelectOrder(order);
                  }}
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    CloseOrder(order);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ManageOrders;
