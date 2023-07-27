import Order from "./Order";
import classes from "./Orders.module.scss";

function Orders() {
  return (
    <div className={classes.orders}>
      <div className={classes["orders__column"]}>
        <Order type={"buy"} />
      </div>
      <div className={classes["orders__column"]}>
        <Order type={"sell"} />
      </div>
    </div>
  );
}

export default Orders;
