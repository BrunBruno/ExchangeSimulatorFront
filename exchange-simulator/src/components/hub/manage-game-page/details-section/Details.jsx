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

      localStorage.setItem("gameName", name);
      navigate(`/game/${name}`, {
        state: { popup: "Game started!" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onJoinGame = (name) => {
    localStorage.setItem("gameName", name);
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
              {gameDetails.players.map((player) => {
                let color = randomColor();
                return (
                  <p key={player.name}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" stroke={color} cx="12" cy="7" r="5" />
                      <path
                        fill="none"
                        stroke={color}
                        d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
                      />
                    </svg>
                    {player.name}
                  </p>
                );
              })}
            </div>
            <div className={classes.coins}>
              <div className={classes["coins__title"]}>Coins</div>
              {gameDetails.coins.map((coin) => {
                let color = randomColor();

                const coinElement = coin.imageUrl ? (
                  <img src={coin.imageUrl} />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke={color}
                    />
                  </svg>
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
