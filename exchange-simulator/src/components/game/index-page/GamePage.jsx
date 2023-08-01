import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

import { baseUrl, authorization } from "../../Shared/options/ApiOptions";
import { onExpandElement } from "../../Shared/functions/components-function";

import classes from "./GamePage.module.scss";

import Header from "./header-section/Header";
import Orders from "./orders-section/Orders";
import Panel from "./panel-section/Panel";
import LoadingPage from "../../Shared/pages/loading-page/LoadingPage";
import ManageOrders from "./manage-orders-section/ManageOrders";
import Details from "./details-section/Details";

function GamePage() {
  const location = useLocation();
  const gameName = location.state.gameName;

  const connectionRef = useRef(null);
  const manageOrdersRef = useRef();
  const gridRef = useRef(null);

  const [playerInfo, setPlayerInfo] = useState(null);

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
    GetPlayerInfo();
    connectionInit();

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

  if (!playerInfo) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.container}>
      <Header />
      <div ref={gridRef} className={classes["container__grid"]}>
        <div className={classes["container__grid__column"]}>
          <Panel
            gameName={gameName}
            playerInfo={playerInfo}
            connection={connectionRef.current}
            GetOwnerOrders={GetOwnerOrders}
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
          <Details playerInfo={playerInfo} />
        </div>
        {/* <Messenger playerInfo={playerInfo} /> */}
      </div>
    </div>
  );
}

export default GamePage;
