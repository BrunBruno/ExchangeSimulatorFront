import { useEffect, useRef, useState } from "react";

import classes from "./CreateGame.module.scss";

import Header from "../header/Header";
import CoinForm from "./CoinForm";
import GameForm from "./GameForm";

function CreateGame() {
  const [coinList, setCoinList] = useState([]);

  const coinMenuRef = useRef(null);
  const coinListRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      coinListRef.current.scrollLeft += event.deltaY;
    };

    coinListRef.current.addEventListener("wheel", handleScroll, {
      passive: false,
    });
  }, []);

  const onAddCoin = (event) => {
    event.preventDefault();
    const coin = {
      name: event.target.coinName.value,
      quantity: event.target.amount.value,
    };

    if (coin.name === "" || coin.quantity === "") {
      return;
    }

    const isCoinExist = coinList.some((item) => item.name === coin.name);
    if (isCoinExist) {
      return;
    }

    setCoinList((prevCoinList) => [...prevCoinList, coin]);
  };

  const onDeleteCoin = (index) => {
    setCoinList((prevCoinList) => {
      const updatedList = [...prevCoinList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  const onCoinMenuExpand = () => {
    if (coinMenuRef.current.classList.contains(classes["create-coin-hidden"])) {
      coinMenuRef.current.classList.remove(classes["create-coin-hidden"]);
    } else {
      coinMenuRef.current.classList.add(classes["create-coin-hidden"]);
    }
  };

  const onCreateNewGame = (event) => {
    event.preventDefault();
    const game = {
      name: event.target.gameName.value,
      description: event.target.description.value,
      password: event.target.password.value,
      money: event.target.amount.value,
      coins: coinList,
      endGame: event.target.endDate.value,
      numberOfPlayers: event.target.numberOfPlayers.value,
    };

    console.log(game);
  };

  return (
    <div className={classes.container}>
      <Header />

      <div className={classes["create-container"]}>
        <div className={classes["create-container__content"]}>
          <div className={classes["create-container__content__column"]}>
            <h1>Create New Game</h1>
            <div className={classes.intro}>
              <p>
                Welcome to the Create New Game page! This page allows you to
                create a new game with customized settings and properties. Fill
                in the details below to set up your game and get started:
              </p>
              <ul>
                <li>
                  <span>Name:</span> Enter the name of your game. Choose a
                  descriptive and catchy name that represents the theme or
                  purpose of your game.
                </li>
                <li>
                  <span>Description:</span> Provide a brief description of your
                  game. This can include details about the gameplay, objectives,
                  or any special features.
                </li>
                <li>
                  <span>Password:</span> Optionally, set a password for your
                  game to restrict access. Only players who know the password
                  will be able to join.
                </li>
                <li>
                  <span>Starting Money:</span> Specify the initial amount of
                  money that all players will receive at the beginning of the
                  game. This determines the starting resources available to
                  players.
                </li>
                <li>
                  <span>End Date:</span> Select the end date for your game. This
                  sets the duration or timeline for which the game will be
                  active. The game will automatically end after this date.
                </li>
                <li>
                  <span>Number of Players:</span> Select how many players can
                  join the game.
                </li>
                <li>
                  <span>Cooins:</span> Add coins to list. Players will game
                  selected amount of each coin at the begining of the game. This
                  determines the starting resources available to players.
                </li>
              </ul>
              <p>
                Once you have filled in the required information, click the
                "Create" button to create your game. You can always edit the
                game settings later if needed. Get ready to embark on an
                exciting gaming experience and have fun playing your newly
                created game!
              </p>
            </div>
          </div>
          <div className={classes["create-container__content__column"]}>
            <div
              ref={coinMenuRef}
              className={`${classes["create-coin"]} ${classes["create-coin-hidden"]}`}
            >
              <CoinForm
                onAddCoin={onAddCoin}
                coinMenuRef={coinMenuRef}
                onCoinMenuExpand={onCoinMenuExpand}
              />
            </div>
            <GameForm
              coinList={coinList}
              coinListRef={coinListRef}
              onCreateNewGame={onCreateNewGame}
              onDeleteCoin={onDeleteCoin}
              onCoinMenuExpand={onCoinMenuExpand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
