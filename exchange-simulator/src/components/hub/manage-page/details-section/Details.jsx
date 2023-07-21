import { useEffect, useState } from "react";
import classes from "./Details.module.scss";
import axios from "axios";
import baseUrl from "../../../Shared/Url";

function Details(props) {
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const game = await axios.get(
          `${baseUrl}/game/game-details?gameName=${props.game.name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setGameDetails(game.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, []);

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

  if (!gameDetails) {
    return;
  }

  return (
    <div className={classes.details}>
      <div className={classes["details__content"]}>
        <div className={classes["details__content__header"]}>
          <h2>{gameDetails.name}</h2>
        </div>

        <div className={classes["details__content__grid"]}>
          <div className={classes["details__content__grid__column"]}>
            <p>
              <span>Description: </span>
              {gameDetails.description}
            </p>
            <p>
              <span>Starting money: </span>
              {gameDetails.money}$
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
              <span>Starts At: </span>
              {gameDetails.startsAt
                ? new Date(gameDetails.startsAt).toLocaleString()
                : "Not yet started"}
            </p>
            <p>
              <span>Ends At: </span>
              {gameDetails.endsAt
                ? new Date(gameDetails.endsAt).toLocaleString()
                : "Not yet ended"}
            </p>

            <button>Start Now</button>
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
