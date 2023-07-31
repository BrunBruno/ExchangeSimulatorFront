import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { makeShortDate } from "../../../Shared/functions/extra-functions";
import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { CardStyles } from "../BrowserPageOptions";

import classes from "./Card.module.scss";

import GameControllerSvg from "../../../Shared/svgs/GameControllerSvg";

function Card(props) {
  const navigate = useNavigate();

  const passwordErrRef = useRef(null);

  const [randomStyle, setRandomStyle] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CardStyles.length);
    setRandomStyle(classes[CardStyles[randomIndex]]);
  }, []);

  const onJoinGame = async (event) => {
    event.preventDefault();

    try {
      const joinPlayer = {
        gameName: event.target.gameName.value,
        password: event.target.gamePassword.value,
      };

      await axios.post(
        `${baseUrl}/game/join-game`,
        joinPlayer,
        authorization(localStorage.getItem("token"))
      );

      navigate("/hub/current-games", {
        state: { title: "Current Games" },
      });
    } catch (err) {
      passwordErrRef.current.classList.remove(classes["hidden-error"]);
    }
  };

  const onReJoinGame = async (event) => {
    event.preventDefault();

    navigate(`/game/${event.target.gameName.value}`, {
      state: { gameName: event.target.gameName.value },
    });
  };

  const handleSubmit = (event) => {
    if (props.join === 1) {
      onJoinGame(event);
    } else if (props.join === 2) {
      onReJoinGame(event);
    }
  };

  return (
    <div
      ref={props.cardRef}
      className={classes.card}
      onMouseEnter={() => {
        props.onSelectGame(props.game);
      }}
    >
      <div className={`${classes["card__content"]} ${randomStyle}`}>
        <div className={classes.text}>
          <GameControllerSvg />
          <div>
            <h2>{props.game.name}</h2>
            <p>by {props.game.ownerName}</p>
            <span>{makeShortDate(props.game.createdAt)}</span>
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          {props.join === 1 && (
            <div className={classes["form__element"]}>
              <p>Enter password:</p>
              <input type="password" name="gamePassword" autoComplete="" />
              <p
                ref={passwordErrRef}
                className={`${classes["password-error"]} ${classes["hidden-error"]}`}
              >
                Incorrect password.
              </p>
            </div>
          )}
          {props.join === 2 && props.game.status === 0 && (
            <div className={classes["form__element"]}>
              <p>Players:</p>
              <div className={classes.indicator}>
                <div
                  className={classes["indicator__fill"]}
                  style={{ width: `${props.game.playersRatio}%` }}
                />
              </div>
            </div>
          )}
          {props.join === 2 && props.game.status === 1 && (
            <div className={classes["form__element"]}>
              <p>Time:</p>
              <div className={classes.indicator}>
                <div
                  className={classes["indicator__fill"]}
                  style={{ width: `${props.game.timeRatio}%` }}
                />
              </div>
            </div>
          )}
          <input
            type="text"
            name="gameName"
            value={props.game.name}
            onChange={() => {}}
            className={classes["hidden-input"]}
          />
          <div className={classes.buttons}>
            {props.join === 1 && <button type="submit">Join</button>}
            {props.join === 2 && props.game.status === 0 && (
              <div className={classes.waiting}>Waiting...</div>
            )}
            {props.join === 2 && props.game.status === 1 && (
              <button type="submit">Enter!</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Card;
