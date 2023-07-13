import { useEffect, useRef, useState } from "react";
import classes from "./Tip.module.scss";

function Tip() {
  const introRef = useRef(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    setTimeout(() => {
      onShowContent();
    }, 1000);
  }, []);

  const onChangeContent = () => {
    if (introRef.current.classList.contains(classes["hidden-conetnt"])) {
      onShowContent();
    } else {
      onHideContent();
    }
  };

  const onHideContent = () => {
    introRef.current.classList.add(classes["hidden-conetnt"]);
    setIcon(
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 7L10 12L15 17" stroke="#fff" />
      </svg>
    );
  };
  const onShowContent = () => {
    introRef.current.classList.remove(classes["hidden-conetnt"]);
    setIcon(
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 7L14 12L9 17" stroke="#fff" />
      </svg>
    );
  };

  return (
    <div
      ref={introRef}
      className={`${classes.intro} ${classes["hidden-conetnt"]}`}
    >
      <div></div>
      <div className={classes.hide} onClick={onChangeContent}>
        {icon}
      </div>
      <div className={classes["intro__content"]}>
        <p>
          Welcome to the game creator! This page allows you to create a new game
          with customized settings and properties. Fill in the details below to
          set up your game and get started:
        </p>
        <ul>
          <li>
            <span>Name:</span> Enter the name of your game. Choose a descriptive
            and catchy name that represents the theme or purpose of your game.
          </li>
          <li>
            <span>Description:</span> Provide a brief description of your game.
            This can include details about the gameplay, objectives, or any
            special features.
          </li>
          <li>
            <span>Password:</span> Optionally, set a password for your game to
            restrict access. Only players who know the password will be able to
            join.
          </li>
          <li>
            <span>Starting Money:</span> Specify the initial amount of money
            that all players will receive at the beginning of the game. This
            determines the starting resources available to players.
          </li>
          <li>
            <span>End Date:</span> Select the end date for your game. This sets
            the duration or timeline for which the game will be active. The game
            will automatically end after this date.
          </li>
          <li>
            <span>Number of Players:</span> Select how many players can join the
            game.
          </li>
          <li>
            <span>Cooins:</span> Add coins to list. Players will game selected
            amount of each coin at the begining of the game. This determines the
            starting resources available to players.
          </li>
        </ul>
        <p>
          Once you have filled in the required information, click the "Create"
          button to create your game. Get ready to embark on an exciting gaming
          experience and have fun playing your newly created game!
        </p>
      </div>
    </div>
  );
}

export default Tip;
