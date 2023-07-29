import { useEffect, useState } from "react";
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

function GamePage() {
  const location = useLocation();
  const [gameName, setGameName] = useState(location.state.gameName);
  const [playerInfo, setPlayerInfo] = useState(null);

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

  // .withUrl(`http://192.168.1.46:5130/game`, {
  const connection = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Debug)
    .withUrl(`http://localhost:5130/game`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

  connection
    .start()
    .then(async () => {
      connection
        .invoke("JoinGame", gameName)
        .then((result) => {
          // console.log("Method invocation successful:", result);
        })
        .catch((error) => {
          // console.error("Error invoking method on hub:", error);
        });
    })
    .catch((error) => {
      // console.error("Error connecting to SignalR hub:", error);
    });

  connection.on("OrdersChanged", () => {
    GetPlayerInfo();
  });

  // const onMakeOrder = async () => {
  //   // connection
  //   //   .invoke("", gameName)
  //   //   .then((result) => {
  //   //     OrdersChanged;
  //   //     console.log("Method invocation successful:", result);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error invoking method on hub:", error);
  //   //   });
  //   // try {
  //   //   await axios.get(`${baseUrl}/game/order/${gameName}`);
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // };

  useEffect(() => {
    GetPlayerInfo();
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
          <Orders gameName={gameName} />
        </div>
        <div className={classes["container__grid__column"]}>
          <Plot />
          <Messenger playerInfo={playerInfo} />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
