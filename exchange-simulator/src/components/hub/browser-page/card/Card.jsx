import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../Shared/Url";

import classes from "./Card.module.scss";

function Card(props) {
  const navigate = useNavigate();

  const passwordErrRef = useRef(null);

  const [randomStyle, setRandomStyle] = useState("");

  useEffect(() => {
    const styles = [
      "content-style-1",
      "content-style-2",
      "content-style-3",
      "content-style-4",
      "content-style-5",
      "content-style-6",
      "content-style-7",
      "content-style-8",
      "content-style-9",
    ];
    const randomIndex = Math.floor(Math.random() * styles.length);
    setRandomStyle(classes[styles[randomIndex]]);
  }, []);

  const onJoinGame = async (event) => {
    event.preventDefault();

    try {
      const joinPlayer = {
        gameName: event.target.gameName.value,
        password: event.target.gamePassword.value,
      };

      await axios.post(`${baseUrl}/game/join-game`, joinPlayer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      passwordErrRef.current.classList.remove(classes["hidden-error"]);
    }
  };

  const onReJoinGame = async (event) => {
    event.preventDefault();
    // transfer to game
    console.log("re-join");
  };

  const handleSubmit = (event) => {
    if (props.join === 1) {
      onJoinGame(event);
    } else if (props.join === 2) {
      onReJoinGame(event);
    }
  };

  return (
    <div ref={props.cardRef} className={classes.card}>
      <div className={`${classes["card__content"]} ${randomStyle}`}>
        <div className={classes.text}>
          <svg
            fill="#fff"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.226 2.361c-0.8-0.375-1.556-0.729-2.245-1.075-1.765-0.884-3.364-1.313-4.89-1.313-3.072 0-5.197 1.772-6.53 3.105l-6.464 6.471c-3.459 3.463-4.011 6.988-1.79 11.431 0.345 0.69 0.699 1.448 1.074 2.251 2.022 4.325 4.112 8.796 7.533 8.796 0.096 0 0.191-0.003 0.288-0.011 3.53-0.276 4.532-4.822 5.416-8.831 0.14-0.635 0.274-1.244 0.41-1.79 0.238-0.944 0.705-1.53 1.986-2.814l0.176-0.177 0.108-0.108 0.285-0.284c1.284-1.284 1.87-1.751 2.816-1.989 0.541-0.136 1.148-0.27 1.782-0.409 4.007-0.884 8.55-1.886 8.825-5.423 0.278-3.588-4.327-5.745-8.781-7.83zM29.952 10.010c-0.195 2.493-5.775 3.229-9.097 4.062-1.469 0.371-2.363 1.149-3.712 2.498-0.094 0.094-0.189 0.188-0.284 0.283s-0.189 0.191-0.283 0.284c-1.349 1.351-2.125 2.244-2.495 3.715-0.834 3.325-1.568 8.912-4.058 9.107-0.045 0.003-0.090 0.005-0.135 0.005-2.642 0-4.865-6.008-6.826-9.927-1.992-3.985-1.139-6.569 1.417-9.128 0.49-0.491 1.101-1.101 1.848-1.849 0.763-0.764 1.671-1.673 2.747-2.75 0.747-0.748 1.357-1.357 1.848-1.849 1.588-1.589 3.186-2.52 5.122-2.52 1.181 0 2.489 0.345 3.996 1.102 3.983 1.997 10.122 4.265 9.912 6.968zM14.962 10.977h2v-2h-2v2zM14.962 7.977h2v-2h-2v2zM17.962 7.977h2v-2h-2v2zM17.962 10.977h2v-2h-2v2zM10.309 16.982l0.761-0.761c0.375-0.375 0.375-0.983 0-1.358s-0.982-0.375-1.357 0l-0.761 0.761-0.761-0.761c-0.375-0.375-0.982-0.375-1.357 0s-0.375 0.983 0 1.358l0.761 0.761-0.761 0.761c-0.375 0.375-0.375 0.983 0 1.357s0.983 0.375 1.357 0l0.761-0.761 0.783 0.783c0.375 0.375 0.982 0.375 1.357 0s0.375-0.983 0-1.358z"></path>
          </svg>
          <div>
            <h2>{props.name}</h2>
            <p>by {props.owner}</p>
            <span>{new Date(props.createdAt).toDateString()}</span>
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          {props.join === 1 && (
            <div>
              <p>Enter password:</p>
              <input type="password" name="gamePassword" />
              <p
                ref={passwordErrRef}
                className={`${classes["password-error"]} ${classes["hidden-error"]}`}
              >
                Incorrect password.
              </p>
            </div>
          )}
          <input
            type="text"
            name="gameName"
            defaultValue={props.name}
            className={classes["hidden-input"]}
          />
          <div className={classes.buttons}>
            {props.join === 1 && <button type="submit">Join</button>}
            {props.join === 2 && <button type="submit">Re-Join</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Card;