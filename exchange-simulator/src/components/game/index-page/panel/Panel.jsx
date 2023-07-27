import { useEffect, useRef } from "react";
import classes from "./Panel.module.scss";

function Panel(props) {
  const panelRef = useRef(null);
  useEffect(() => {}, []);

  const onExpandPanel = () => {
    if (panelRef.current) {
      if (panelRef.current.classList.contains(classes["hidden-panel"])) {
        panelRef.current.classList.remove(classes["hidden-panel"]);
      } else {
        panelRef.current.classList.add(classes["hidden-panel"]);
      }
    }
  };

  return (
    <div
      ref={panelRef}
      className={`${classes.panel} ${classes["hidden-panel"]}`}
    >
      <div className={classes["panel__actions"]}>
        <button onClick={props.onMakeOrder}>Buy</button>
        <button>Sell</button>
      </div>
      <div className={classes["panel__button"]} onClick={onExpandPanel}></div>
      <div />
    </div>
  );
}

export default Panel;
