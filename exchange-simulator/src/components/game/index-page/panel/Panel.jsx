import { useEffect, useRef } from "react";
import classes from "./Panel.module.scss";
import { useState } from "react";

function Panel(props) {
  const panelRef = useRef(null);
  const formRef = useRef(null);

  const orderTypes = {
    buy: 0,
    sell: 1,
  };

  const [orderType, setOrderType] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      }
    }, 1000);
  }, []);

  const onExpandPanel = () => {
    if (panelRef.current) {
      if (panelRef.current.classList.contains(classes["hidden-panel"])) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      } else {
        formRef.current.classList.add(classes["expand-close"]);
        setTimeout(() => {
          panelRef.current.classList.add(classes["hidden-panel"]);
        }, 300);
      }
    }
  };

  const onOpenOrderForm = (type) => {
    setOrderType(type);
    if (formRef.current) {
      formRef.current.classList.remove(classes["expand-close"]);
    }
  };

  return (
    <div className={classes.panel}>
      <div
        className={`${classes["panel__actions"]} ${classes["hidden-panel"]}`}
        ref={panelRef}
      >
        <h1>Create Order!</h1>
        <div className={classes.buttons}>
          <button
            onClick={() => {
              onOpenOrderForm(orderTypes.buy);
            }}
          >
            Buy
          </button>
          <button
            onClick={() => {
              onOpenOrderForm(orderTypes.sell);
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <div className={classes["panel__button"]} onClick={onExpandPanel}></div>
      <div
        ref={formRef}
        className={`${classes["panel__expand"]} ${classes["expand-close"]}`}
      >
        <div />
        <form className={classes.form} action="">
          <h2>
            {orderType === 0 ? (
              <span className={classes.buy}>Buy</span>
            ) : (
              <span className={classes.sell}>Sell</span>
            )}
          </h2>
          <input placeholder="Price" />
          <input placeholder="Amount" />
          <button>Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default Panel;
