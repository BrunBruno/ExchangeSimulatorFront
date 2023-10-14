import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { makeNiceDate } from "../../../Shared/functions/extra-functions";
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
      const joinToGame = {
        password: event.target.gamePassword.value,
      };

      await axios.post(
        `${baseUrl}/game/${props.game.name}/player/join-game`,
        joinToGame,
        authorization(localStorage.getItem("token"))
      );

      navigate("/hub/current-games", {
        state: {
          popup: "Game joined.",
          title: "current-games",
        },
      });
    } catch (err) {
      passwordErrRef.current.classList.remove(classes["hidden-error"]);
    }
  };

  const onReJoinGame = async (event) => {
    event.preventDefault();

    sessionStorage.setItem("gameName", props.game.name);
    navigate(`/game/${props.game.name}`, {
      state: {
        gameName: props.game.name,
        popup: "Game joined.",
      },
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
            <span>{makeNiceDate(props.game.createdAt)}</span>
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
