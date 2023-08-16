import { useRef } from "react";

import classes from "./Panel.module.scss";

import CreateLimitOrder from "./CreateLimitOrder";
import CreateMarketOrder from "./CreateMarketOrder";

function Panel(props) {
  const limitRef = useRef(null);
  const marketRef = useRef(null);
  const limitFormRef = useRef(null);
  const marketFormRef = useRef(null);

  const onExpandPanel = async (
    firstRef,
    secondRef,
    firstFormRef,
    secondFormRef
  ) => {
    if (!secondRef.current.classList.contains(classes["hidden-panel"])) {
      hidePanel(secondRef, secondFormRef);
    }

    if (firstRef.current.classList.contains(classes["hidden-panel"])) {
      firstRef.current.classList.remove(classes["hidden-panel"]);
    } else {
      await hidePanel(firstRef, firstFormRef);
    }

    alignBothHidden();
  };

  const hidePanel = (ref, formRef) => {
    return new Promise((resolve) => {
      if (formRef.current.classList.contains(classes["expand-close"])) {
        ref.current.classList.add(classes["hidden-panel"]);
        resolve();
      } else {
        formRef.current.classList.add(classes["expand-close"]);

        setTimeout(() => {
          ref.current.classList.add(classes["hidden-panel"]);
          resolve();
        }, 300);
      }
    });
  };

  const alignBothHidden = () => {
    if (
      marketRef.current.classList.contains(classes["hidden-panel"]) &&
      limitRef.current.classList.contains(classes["hidden-panel"])
    ) {
      limitRef.current.classList.add(classes["limit-hidden"]);
      marketRef.current.classList.add(classes["market-hidden"]);
    } else {
      limitRef.current.classList.remove(classes["limit-hidden"]);
      marketRef.current.classList.remove(classes["market-hidden"]);
    }
  };

  return (
    <div className={classes.panel}>
      <CreateLimitOrder
        gameName={props.gameName}
        playerInfo={props.playerInfo}
        GetOwnerOrders={props.GetOwnerOrders}
        limitRef={limitRef}
        marketRef={marketRef}
        limitFormRef={limitFormRef}
        marketFormRef={marketFormRef}
        onExpandPanel={onExpandPanel}
        setPopupContent={props.setPopupContent}
        setTransactionsInfo={props.setTransactionsInfo}
      />
      <CreateMarketOrder
        gameName={props.gameName}
        playerInfo={props.playerInfo}
        GetOwnerOrders={props.GetOwnerOrders}
        limitRef={limitRef}
        marketRef={marketRef}
        limitFormRef={limitFormRef}
        marketFormRef={marketFormRef}
        onExpandPanel={onExpandPanel}
        setPopupContent={props.setPopupContent}
        setTransactionsInfo={props.setTransactionsInfo}
      />
    </div>
  );
}

export default Panel;
