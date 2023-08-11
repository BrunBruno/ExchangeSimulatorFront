import axios from "axios";

import { authorization, baseUrl } from "../../../Shared/options/ApiOptions";
import { showDecimal } from "../../../Shared/functions/extra-functions";

import classes from "./Ranking.module.scss";
import { useEffect, useState } from "react";

function Ranking(props) {
  const [players, setPlayers] = useState([]);
  const getRanking = async () => {
    try {
      const players = await axios.get(
        `${baseUrl}/game/${props.gameName}/player/all`,
        authorization(localStorage.getItem("token"))
      );

      setPlayers(players.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className={classes.ranking}>
      <ul className={classes["ranking__list"]}>
        <li>
          <p>Position</p>
          <p>Balance</p>
          <p>Turn over</p>
          <p>Trades</p>
        </li>
        {players.map((player, index) => (
          <li
            key={index}
            style={
              player.name === props.playerInfo.name ? { color: "#51cf66" } : {}
            }
          >
            {player.name === props.playerInfo.name ? (
              <p>You</p>
            ) : (
              <p> No {index + 1}.</p>
            )}

            <p>{showDecimal(player.balance, 2)} $</p>
            <p>{showDecimal(player.turnOver, 2)} $</p>
            <p>{player.trades}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
