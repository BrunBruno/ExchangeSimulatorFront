import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import {
  randomColor,
  makeFullDate,
  makeDuration,
} from "../../../Shared/functions/extra-functions";
import { GameStatus } from "../ManageGamePageOptions";

import classes from "./Details.module.scss";

import XSvg from "../../../Shared/svgs/XSvg";
import CoinSvg from "../../../Shared/svgs/CoinSvg";
import PlayerSvg from "../../../Shared/svgs/PlayerSvg";

function Details(props) {
  const navigate = useNavigate();

  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const game = await axios.get(
          `${baseUrl}/game/${props.game.name}`,
          authorization(localStorage.getItem("token"))
        );

        setGameDetails(game.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, []);

  const onGameStart = async (name) => {
    try {
      const game = {
        gameName: name,
      };

      await axios.put(
        `${baseUrl}/game/start-game`,
        game,
        authorization(localStorage.getItem("token"))
      );

      sessionStorage.setItem("gameName", name);
      navigate(`/game/${name}`, {
        state: { popup: "Game started!" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onJoinGame = (name) => {
    sessionStorage.setItem("gameName", name);
    navigate(`/game/${name}`, {
      state: { gameName: name, popup: "Game joined." },
    });
  };

  if (!gameDetails) {
    return;
  }

  return (
    <div className={classes.details}>
      <div className={classes["details__content"]}>
        <div className={classes["details__content__header"]}>
          <h2>{gameDetails.name}</h2>
          <div className={classes.x} onClick={props.onCloseDetails}>
            <XSvg />
          </div>
        </div>

        <div className={classes["details__content__grid"]}>
          <div className={classes["details__content__grid__column"]}>
            <div className={classes["details__content__grid__column__info"]}>
              <p>
                <span>Description: </span>
                {gameDetails.description}
              </p>
              <p>
                <span>Starting money: </span>
                {gameDetails.totalBalance}$
              </p>
              <p>
                <span>Players Count: </span>
                {gameDetails.playerCount}
              </p>
              <p>
                <span>Available spots: </span>
                {gameDetails.availableSpots}
              </p>
              <p>
                <span>Duration: </span>
                {makeDuration(gameDetails.duration)}
              </p>
              <p>
                <span>Created At: </span>
                {makeFullDate(gameDetails.createdAt)}
              </p>
              <p>
                <span>Started At: </span>
                {gameDetails.startsAt
                  ? makeFullDate(gameDetails.startsAt)
                  : "Not yet started"}
              </p>
              <p>
                <span>Ended At: </span>
                {gameDetails.endsAt
                  ? makeFullDate(gameDetails.endsAt)
                  : "Not yet ended"}
              </p>
            </div>

            {gameDetails.status === GameStatus.available ? (
              <button
                onClick={() => {
                  onGameStart(gameDetails.name);
                }}
              >
                Start Now
              </button>
            ) : (
              <button
                onClick={() => {
                  onJoinGame(gameDetails.name);
                }}
              >
                Enter
              </button>
            )}
          </div>
          <div className={classes["details__content__grid__column"]}>
            <div className={classes.players}>
              <div className={classes["players__title"]}>Players</div>
              {gameDetails.players.map((player) => (
                <p key={player.name}>
                  <PlayerSvg color={randomColor(player.name)} />
                  {player.name}
                </p>
              ))}
            </div>
            <div className={classes.coins}>
              <div className={classes["coins__title"]}>Coins</div>
              {gameDetails.coins.map((coin) => {
                const coinElement = coin.imageUrl ? (
                  <img src={coin.imageUrl} />
                ) : (
                  <CoinSvg color={randomColor(coin.name)} />
                );

                return (
                  <p key={coin.name}>
                    {coinElement}
                    <span>{coin.name}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
