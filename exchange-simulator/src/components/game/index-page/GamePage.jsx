import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

import classes from "./GamePage.module.scss";

import Header from "./header/Header";
import Orders from "./orders/Orders";
import Panel from "./panel/Panel";
import baseUrl from "../../Shared/Url";
import Plot from "./plot/Plot";
import Messenger from "./messenger/Messenger";
import LoadingPage from "../../Shared/LoadingPage";
import ManageOrders from "./manage/ManageOrders";

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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
