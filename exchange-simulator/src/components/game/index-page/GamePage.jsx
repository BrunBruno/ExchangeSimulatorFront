import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

import usePopup from "../../Shared/hooks/usePopup ";
import { baseUrl, authorization } from "../../Shared/options/ApiOptions";
import { onExpandElement } from "../../Shared/functions/components-function";

import classes from "./GamePage.module.scss";

import Header from "./header-section/Header";
import Orders from "./orders-section/Orders";
import Panel from "./panel-section/Panel";
import LoadingPage from "../../Shared/pages/loading-page/LoadingPage";
import ManageOrders from "./manage-orders-section/ManageOrders";
import Details from "./details-section/Details";
import Messenger from "./messenger/Messenger";
import Tutorial from "./tutorial-section/Tutorial";

import GuideSvg from "../../Shared/svgs/GuideSvg";
import { info } from "sass";

function GamePage() {
  const connectionRef = useRef(null);
  const manageOrdersRef = useRef(null);
  const gridRef = useRef(null);
  const infoRef = useRef(null);

  const [gameName, setGameName] = useState(sessionStorage.getItem("gameName"));
  const [playerInfo, setPlayerInfo] = useState(null);

  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [transactionsInfo, setTransactionsInfo] = useState(null);

  const [infoPpupRef, popupContent, setPopupContent] = usePopup(
    classes["hidden-popup"]
  );

  const connectionInit = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://192.168.1.46:5130/game`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connectionRef.current = connection;

    await connection.start();
    await connection.invoke("JoinGame", gameName);

    connection.on("OrdersChanged", () => {
      GetPlayerInfo();
    });
  };

  const GetPlayerInfo = async () => {
    try {
      const playerInfo = await axios.get(
        `${baseUrl}/game/${gameName}/player/my`,
        authorization(localStorage.getItem("token"))
      );

      setPlayerInfo(playerInfo.data);
    } catch (err) {
      console.log(err);
    }
  };

  const GetOwnerOrders = () => {
    if (manageOrdersRef.current) {
      manageOrdersRef.current.getOrders();
    }
  };

  useEffect(() => {
    connectionInit();
    GetPlayerInfo();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off("OrdersChanged");
      }

      if (connectionRef.current.state === "Connected") {
        connectionRef.current
          .invoke("LeaveGame", gameName)
          .catch((err) => console.error(err));
      }
    };
  }, []);

  const onExpandDetails = () => {
    onExpandElement(gridRef, classes["hidden-details"]);
  };

  useEffect(() => {
    if (transactionsInfo && transactionsInfo.lenght > 0 && infoRef.current) {
      infoRef.current.classList.remove(classes["hidden-info"]);
    }
  }, [transactionsInfo]);

  if (!playerInfo) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.container}>
      <Header />
      <div ref={gridRef} className={classes["container__grid"]}>
        <div
          ref={infoRef}
          className={`${classes["container__grid__info"]} ${classes["hidden-info"]}`}
          onClick={() => {
            setTransactionsInfo(null);
            infoRef.current.classList.add(classes["hidden-info"]);
          }}
        >
          {transactionsInfo !== null &&
            transactionsInfo.map((info, index) => (
              <div key={index}>
                {info.moneyAmount !== null && (
                  <p>Money Amount: {info.moneyAmount}</p>
                )}
                {info.coinAmount !== null && (
                  <p>Coin Amount: {info.coinAmount}</p>
                )}
              </div>
            ))}
        </div>
        <div className={classes["container__grid__column"]}>
          <Panel
            gameName={gameName}
            playerInfo={playerInfo}
            connection={connectionRef.current}
            GetOwnerOrders={GetOwnerOrders}
            setPopupContent={setPopupContent}
            setTransactionsInfo={setTransactionsInfo}
          />
          <Orders
            gameName={gameName}
            connection={connectionRef.current}
            playerInfo={playerInfo}
          />
        </div>
        <div className={classes["container__grid__column"]}>
          <ManageOrders
            ref={manageOrdersRef}
            gameName={gameName}
            playerInfo={playerInfo}
            connection={connectionRef.current}
          />
          {window.innerWidth <= 800 ? (
            <div
              className={classes["container__grid__column__button"]}
              onClick={onExpandDetails}
            >
              <p>Details</p>
            </div>
          ) : (
            ""
          )}
          <Details gameName={gameName} playerInfo={playerInfo} />
        </div>
        <div
          className={classes["tutorial-button"]}
          onClick={() => {
            setTutorialVisible(true);
          }}
        >
          <GuideSvg />
          <span>See tutorial</span>
        </div>
        <Messenger playerInfo={playerInfo} />
        <Tutorial
          tutorialVisible={tutorialVisible}
          setTutorialVisible={setTutorialVisible}
        />
      </div>
      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      >
        {popupContent}
      </div>
    </div>
  );
}

export default GamePage;
