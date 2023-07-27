import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

import classes from "./GamePage.module.scss";

import Header from "./header/Header";
import Orders from "./orders/Orders";
import Panel from "./panel/Panel";
import axios from "axios";
import baseUrl from "../../Shared/Url";

function GamePage() {
  const { gameName } = useParams();

  // .withUrl(`http://192.168.1.46:5130/game`, {
  const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
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
          console.log("Method invocation successful:", result);
        })
        .catch((error) => {
          console.error("Error invoking method on hub:", error);
        });
    })
    .catch((error) => {
      console.error("Error connecting to SignalR hub:", error);
    });

  connection.on("OrdersChanged", (gameName) => {
    console.log("Orders changed for game:", gameName);
  });

  const onMakeOrder = async () => {
    // connection
    //   .invoke("", gameName)
    //   .then((result) => {
    //     OrdersChanged;
    //     console.log("Method invocation successful:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error invoking method on hub:", error);
    //   });
    try {
      await axios.get(`${baseUrl}/game/order/${gameName}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes["container__grid"]}>
        <div className={classes["container__grid__column"]}>
          <Panel onMakeOrder={onMakeOrder} />
          <Orders />
        </div>
        <div className={classes["container__grid__column"]}></div>
      </div>
    </div>
  );
}

export default GamePage;
