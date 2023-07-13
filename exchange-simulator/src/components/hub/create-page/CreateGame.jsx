import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./CreateGame.module.scss";

import baseUrl from "../../Shared/Url";
import Header from "../header-shared/Header";
import CoinForm from "./CoinForm";
import GameForm from "./GameForm";
import Tip from "./Tip";

function CreateGame() {
  const [coinList, setCoinList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef();
  const coinMenuRef = useRef(null);
  const errorMenuRef = useRef(null);
  const coinListRef = useRef(null);

  const navigate = useNavigate();

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
    if (coinMenuRef.current.classList.contains(classes["hidden"])) {
      coinMenuRef.current.classList.remove(classes["hidden"]);
    } else {
      coinMenuRef.current.classList.add(classes["hidden"]);
    }
  };

  const onErrorMenuClose = () => {
    errorMenuRef.current.classList.add(classes["hidden"]);
    setErrorMessage("");
  };

  const onCreateNewGame = async (event) => {
    event.preventDefault();
    const game = {
      name: event.target.gameName.value,
      description: event.target.description.value,
      password: event.target.password.value,
      money: event.target.amount.value,
      coins: coinList,
      endGame: new Date(event.target.endDate.value),
      numberOfPlayers: event.target.numberOfPlayers.value,
    };

    if (game.name === "") {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please choose a name.");
      return;
    }

    if (game.description === "") {
      game.description = "No description.";
    }

    if (game.password === "") {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please choose a password.");
      return;
    }

    if (game.money <= 0) {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please select amount of starting assets.");
      return;
    }

    if (game.coins.length === 0) {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please fill some coins.");
      return;
    }

    const currentDate = new Date();
    if (game.endGame === "" || currentDate > game.endGame) {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please enter correct end date.");
      return;
    }

    if (game.numberOfPlayers <= 0) {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please select correct number of players.");
      return;
    }

    try {
      await axios.post(`${baseUrl}/game`, game, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const joinPlayer = {
        gameName: game.name,
        password: game.password,
      };

      await axios.post(`${baseUrl}/game/join-game`, joinPlayer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      errorMenuRef.current.classList.remove(classes["hidden"]);
      errorMenuRef.current.classList.add(classes["success"]);
      setErrorMessage("Game created.");

      setTimeout(() => {
        navigate("/hub");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        errorMenuRef.current.classList.remove(classes["hidden"]);
        setErrorMessage(err.response.data);
      } else {
        errorMenuRef.current.classList.remove(classes["hidden"]);
        setErrorMessage("Connection error.");
      }
    }
  };

  return (
    <div ref={containerRef} className={classes.container}>
      <Header containerRef={containerRef} />
      <Tip />

      <div className={classes["container__content"]}>
        <h1>Create New Game</h1>

        <div
          ref={errorMenuRef}
          className={`${classes["error-box"]} ${classes["hidden"]}`}
          onClick={onErrorMenuClose}
        >
          <p>{errorMessage}</p>
        </div>

        <div
          ref={coinMenuRef}
          className={`${classes["create-coin"]} ${classes["hidden"]}`}
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
  );
}

export default CreateGame;
