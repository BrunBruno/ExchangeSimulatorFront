import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./CreateGame.module.scss";

import baseUrl from "../../Shared/Url";
import Header from "../hub-shared/header/Header";
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
      name: event.target.gameName.value.trim(),
      description: event.target.description.value.trim(),
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
          onMouseEnter={onErrorMenuClose}
          onClick={onErrorMenuClose}
        >
          <p>{errorMessage}</p>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 "></path>
          </svg>
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
