import classes from "./Order.module.scss";

function Order(props) {
  return (
    <div className={classes.order}>
      <div className={classes["order__header"]}>{props.type}</div>
    </div>
  );
}

export default Order;
