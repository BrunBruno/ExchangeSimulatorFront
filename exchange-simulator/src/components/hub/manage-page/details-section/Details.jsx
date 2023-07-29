import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./Details.module.scss";

import baseUrl from "../../../Shared/Url";

function Details(props) {
  const colors = [
    "#F5A623",
    "#F8E71C",
    "#7ED321",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#FF686B",
    "#FFD97D",
    "#66D9EF",
    "#FF75A0",
  ];
  const gamesStatus = { available: 0, active: 1, finished: 2 };

  const navigate = useNavigate();

  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const game = await axios.get(`${baseUrl}/game/${props.game.name}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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

      await axios.put(`${baseUrl}/game/start-game`, game, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(`/game/${name}`, {
        state: { gameName: name },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onJoinGame = (name) => {
    console.log(name);
    navigate(`/game/${name}`, {
      state: { gameName: name },
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
          <svg
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onCloseDetails}
          >
            <path
              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
              fill="#e3fafc"
            />
          </svg>
        </div>

        <div className={classes["details__content__grid"]}>
          <div className={classes["details__content__grid__column"]}>
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
              {gameDetails.duration}
            </p>
            <p>
              <span>Created At: </span>
              {new Date(gameDetails.createdAt).toLocaleString()}
            </p>
            <p>
              <span>Started At: </span>
              {gameDetails.startsAt
                ? new Date(gameDetails.startsAt).toLocaleString()
                : "Not yet started"}
            </p>
            <p>
              <span>Ended At: </span>
              {gameDetails.endsAt
                ? new Date(gameDetails.endsAt).toLocaleString()
                : "Not yet ended"}
            </p>

            {gameDetails.status === gamesStatus.available ? (
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
              {gameDetails.players.map((player, index) => {
                let color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <p key={index}>
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
              {gameDetails.coins.map((coin, index) => {
                let color = colors[Math.floor(Math.random() * colors.length)];

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
                  <p key={index}>
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
