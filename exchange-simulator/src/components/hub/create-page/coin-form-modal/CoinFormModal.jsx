import axios from "axios";
import { useEffect, useState } from "react";

import classes from "./CoinFormModal.module.scss";

import XSvg from "../../../Shared/svgs/XSvg";

function CoinFormModal(props) {
  const [apiCoins, setApiCoins] = useState([]);

  useEffect(() => {
    const getCoinsFromApi = async () => {
      try {
        const response = await axios.get(
          "https://api.coinstats.app/public/v1/coins/?currency=USD"
        );

        const modifiedCoins = response.data.coins.map((coin) => ({
          ...coin,
          opacity: "0.5",
        }));

        setApiCoins(modifiedCoins);
      } catch (err) {
        console.error(err);
      }
    };

    getCoinsFromApi();
  }, []);

  return (
    <form className={classes.form}>
      <div className={classes.grid}>
        <h3>Select Coins</h3>
        <div className={classes.x} onClick={props.onCoinMenuExpand}>
          <XSvg />
        </div>
      </div>
      <div className={classes.grid}>
        <ul>
          {apiCoins.map((coin, index) => (
            <li key={index} style={{ opacity: coin.opacity }}>
              <div>
                <img src={coin.icon} />
                <p>{coin.symbol}</p>
              </div>
              <div>
                <p>Amount: </p>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0"
                  onChange={(event) => {
                    const inputValue = parseFloat(event.target.value);
                    const updatedCoins = apiCoins.map((c, i) => {
                      if (i === index) {
                        return {
                          ...c,
                          opacity: inputValue > 0 ? 1 : 0.5,
                        };
                      }
                      return c;
                    });

                    props.onAddCoin(coin.symbol, coin.icon, event.target.value);
                    setApiCoins(updatedCoins);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default CoinFormModal;
