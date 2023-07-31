import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

import { baseUrl, authorization } from "../../Shared/options/ApiOptions";

import classes from "./GamePage.module.scss";

import Header from "./header-section/Header";
import Orders from "./orders-section/Orders";
import Panel from "./panel-section/Panel";
import Plot from "./plot-section/Plot";
import Messenger from "./messenger/Messenger";
import LoadingPage from "../../Shared/pages/loading-page/LoadingPage";
import ManageOrders from "./manage-orders-section/ManageOrders";

function GamePage() {
  const location = useLocation();

  const connectionRef = useRef(null);

  const [gameName, setGameName] = useState(location.state.gameName);
  const [playerInfo, setPlayerInfo] = useState(null);

  const connectionInit = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5130/game`, {
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
        `${baseUrl}/player/my?gameName=${gameName}`,
        authorization(localStorage.getItem("token"))
      );

      setPlayerInfo(playerInfo.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetPlayerInfo();
    connectionInit();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off("OrdersChanged");
      }
    };
  }, []);

  if (!playerInfo) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes["container__grid"]}>
        <div className={classes["container__grid__column"]}>
          <Panel gameName={gameName} playerInfo={playerInfo} />
          <Orders
            gameName={gameName}
            connection={connectionRef.current}
            playerInfo={playerInfo}
          />
        </div>
        <div className={classes["container__grid__column"]}>
          <ManageOrders gameName={gameName} playerInfo={playerInfo} />
          <Plot />
          <Messenger playerInfo={playerInfo} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
