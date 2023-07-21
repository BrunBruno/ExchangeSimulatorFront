import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./CreateGame.module.scss";

import baseUrl from "../../Shared/Url";
import Header from "../hub-shared/Header";
import CoinForm from "./coin-form/CoinForm";
import GameForm from "./game-form/GameForm";
import Tip from "./tip-section/Tip";

function CreateGame() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const coinMenuRef = useRef(null);
  const errorMenuRef = useRef(null);
  const coinListRef = useRef(null);

  const [coinList, setCoinList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      coinListRef.current.scrollLeft += event.deltaY;
    };

    coinListRef.current.addEventListener("wheel", handleScroll, {
      passive: false,
    });
  }, []);

  const onAddCoin = (symbol, image, amount) => {
    if (amount < 0) {
      return;
    }

    setCoinList((prevCoinList) => {
      // Check if the coin already exists in the coinList
      const existingCoinIndex = prevCoinList.findIndex(
        (item) => item.name === symbol
      );

      if (existingCoinIndex !== -1) {
        if (parseFloat(amount) === 0 || amount === "") {
          const updatedCoinList = [...prevCoinList];
          updatedCoinList.splice(existingCoinIndex, 1);
          return updatedCoinList;
        } else {
          const updatedCoinList = [...prevCoinList];
          updatedCoinList[existingCoinIndex].quantity = amount;
          return updatedCoinList;
        }
      } else {
        if (parseFloat(amount) !== 0 && amount !== "") {
          const newCoin = {
            name: symbol,
            quantity: amount,
            imageUrl: image,
          };
          return [...prevCoinList, newCoin];
        } else {
          return prevCoinList;
        }
      }
    });
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
      money: event.target.money.value,
      coins: coinList,
      duration: event.target.duration.value,
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

    if (game.money === "") {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please select amount of starting assets.");
      return;
    }

    if (game.numberOfPlayers === "") {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please select number of players.");
      return;
    }

    if (game.duration === "") {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please select duration of the game.");
      return;
    }

    if (game.coins.length === 0) {
      errorMenuRef.current.classList.remove(classes["hidden"]);
      setErrorMessage("Please fill some coins.");
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

      navigate("/hub", {
        state: { popup: "Game created." },
      });
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
