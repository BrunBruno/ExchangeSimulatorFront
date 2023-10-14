import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";
import { showDecimal } from "../../../Shared/functions/extra-functions";
import { PeriodOfTime } from "../GamePageOptions";

import classes from "./Plot.module.scss";

import LoadingPage from "../../../Shared/pages/loading-page/LoadingPage";

const Plot = (props) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [chartData, setChartData] = useState(null);

  const getChartData = async () => {
    if (selectedCoin && selectedCoin) {
      try {
        const chart = await axios.get(
          `${baseUrl}/game/${props.gameName}/transaction/chart-data?coinName=${selectedCoin}&periodOfTime=${selectedPeriod}`,
          authorization(localStorage.getItem("token"))
        );

        setChartData(chart.data);

        console.log(chart.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setSelectedCoin(props.playerInfo.playerCoins[0].name);
    setSelectedPeriod(PeriodOfTime.Minutes);
  }, [props.playerInfo]);

  useEffect(() => {
    getChartData();
  }, [selectedCoin, selectedPeriod]);

  const onSelectPeriod = (event) => {
    setSelectedPeriod(parseInt(event.target.value, 10));
  };

  const generateEvenlyDistributedValues = (min, max, count) => {
    const step = (max - min) / (count - 1);
    const values = Array.from(
      { length: count },
      (_, index) => min + index * step
    );
    return values;
  };

  const generateEvenlyDistributedDates = (start, end, count) => {
    const startTime = start.getTime();
    const endTime = end.getTime();

    const timeStep = (endTime - startTime) / (count - 1);

    const dateTimes = Array.from(
      { length: count },
      (_, index) => new Date(startTime + index * timeStep)
    );
    return dateTimes;
  };

  if (!chartData) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.plot}>
      <div className={classes.options}>
        <div className={classes["options__coins"]}>
          {props.playerInfo.playerCoins.map((coin) => (
            <div
              key={coin.name}
              className={`${classes.coin} ${
                coin.name === selectedCoin ? classes["selected-coin"] : ""
              }`}
              onClick={() => {
                setSelectedCoin(coin.name);
              }}
            >
              {coin.imageUrl ? (
                <img src={coin.imageUrl} alt={coin.name} />
              ) : (
                <CoinSvg color={randomColor(coin.name)} />
              )}

              <span>{coin.name}</span>
            </div>
          ))}
        </div>
        <div className={classes["options__period"]}>
          <label>
            <input
              type="radio"
              value={PeriodOfTime.Minutes}
              checked={selectedPeriod === PeriodOfTime.Minutes}
              onChange={onSelectPeriod}
            />
            <span>1m</span>
          </label>
          <label>
            <input
              type="radio"
              value={PeriodOfTime.Hour}
              checked={selectedPeriod === PeriodOfTime.Hour}
              onChange={onSelectPeriod}
            />
            <span>5m</span>
          </label>
          <label>
            <input
              type="radio"
              value={PeriodOfTime.Day}
              checked={selectedPeriod === PeriodOfTime.Day}
              onChange={onSelectPeriod}
            />
            <span>1h</span>
          </label>
          <label>
            <input
              type="radio"
              value={PeriodOfTime.Week}
              checked={selectedPeriod === PeriodOfTime.Week}
              onChange={onSelectPeriod}
            />
            <span>1d</span>
          </label>
        </div>
      </div>
      <div className={classes.chart}>
        <div className={classes["y-axies"]}>
          {generateEvenlyDistributedValues(
            chartData.minValue,
            chartData.maxValue,
            10
          )
            .reverse()
            .map((value, index) => (
              <p key={index}>{showDecimal(value, 2)}</p>
            ))}
        </div>

        <div className={classes["x-axies"]}>
          {generateEvenlyDistributedDates(
            new Date(chartData.startDate),
            new Date(chartData.endDate),

            5
          ).map((dateTime, index) => (
            <p key={index}>
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          ))}
        </div>

        {chartData.chartBars.map((bar, index) => (
          <div
            key={index}
            style={{ flex: `1 1 calc(100% / ${chartData.chartBars.length})` }}
            className={classes.bar}
          >
            <div
              className={`${classes.info} ${
                index > chartData.chartBars.length / 2
                  ? classes.right
                  : classes.left
              }`}
              style={{
                top:
                  bar.firstValue > bar.lastValue
                    ? bar.firstValue > 0
                      ? `${
                          (100 * (chartData.maxValue - bar.firstValue)) /
                          (chartData.maxValue - chartData.minValue)
                        }%`
                      : "100%"
                    : bar.lastValue > 0
                    ? `${
                        (100 * (chartData.maxValue - bar.lastValue)) /
                        (chartData.maxValue - chartData.minValue)
                      }%`
                    : "100%",
              }}
            >
              <p>Beg: {showDecimal(bar.firstValue, 2)} $</p>
              <p>
                Fin:{" "}
                {bar.lastValue > 0
                  ? showDecimal(bar.lastValue, 2)
                  : showDecimal(bar.firstValue, 2)}{" "}
                $
              </p>
              <p>
                Max:{" "}
                {bar.maxValue > 0
                  ? showDecimal(bar.maxValue, 2)
                  : showDecimal(bar.firstValue, 2)}{" "}
                $
              </p>
              <p>
                Min:{" "}
                {bar.minValue > 0
                  ? showDecimal(bar.minValue, 2)
                  : showDecimal(bar.firstValue, 2)}{" "}
                $
              </p>
            </div>
            <div
              className={`${classes.thick} ${
                bar.hasIncreased === true
                  ? classes.increase
                  : bar.hasIncreased === false
                  ? classes.decrease
                  : ""
              }`}
              style={{
                height:
                  bar.firstValue > 0 && bar.lastValue > 0
                    ? `${
                        100 *
                        (Math.abs(bar.firstValue - bar.lastValue) /
                          (chartData.maxValue - chartData.minValue))
                      }%`
                    : "0",
                top:
                  bar.firstValue > bar.lastValue
                    ? bar.firstValue > 0
                      ? `${
                          (100 * (chartData.maxValue - bar.firstValue)) /
                          (chartData.maxValue - chartData.minValue)
                        }%`
                      : "100%"
                    : bar.lastValue > 0
                    ? `${
                        (100 * (chartData.maxValue - bar.lastValue)) /
                        (chartData.maxValue - chartData.minValue)
                      }%`
                    : "100%",
              }}
            />

            <div
              className={`${classes.thin} ${
                bar.hasIncreased === true
                  ? classes.increase
                  : bar.hasIncreased === false
                  ? classes.decrease
                  : ""
              }`}
              style={{
                height:
                  bar.maxValue > 0 && bar.minValue > 0
                    ? `${
                        (100 * (bar.maxValue - bar.minValue)) /
                        (chartData.maxValue - chartData.minValue)
                      }%`
                    : "0",
                top:
                  bar.maxValue > 0
                    ? `${
                        (100 * (chartData.maxValue - bar.maxValue)) /
                        (chartData.maxValue - chartData.minValue)
                      }%`
                    : "100%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plot;
