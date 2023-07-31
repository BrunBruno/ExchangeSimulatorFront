import { useState } from "react";

import { DetailsOptions } from "../GamePageOptions";

import classes from "./Details.module.scss";

import Stats from "./Stats";
import Plot from "./Plot";

function Details(props) {
  const [selectedoption, setSelectedOption] = useState(DetailsOptions.stats);

  return (
    <div className={classes.details}>
      <nav className={classes["details__navigation"]}>
        <ul className={classes["details__navigation__list"]}>
          <li
            className={
              selectedoption === DetailsOptions.stats ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.stats);
            }}
          >
            Stats
          </li>
          <li
            className={
              selectedoption === DetailsOptions.ranking ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.ranking);
            }}
          >
            Ranking
          </li>
          <li
            className={
              selectedoption === DetailsOptions.plot ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.plot);
            }}
          >
            Plot
          </li>
        </ul>
      </nav>
      {selectedoption === DetailsOptions.stats ? (
        <Stats playerInfo={props.playerInfo} />
      ) : selectedoption === DetailsOptions.ranking ? (
        ""
      ) : selectedoption === DetailsOptions.plot ? (
        <Plot />
      ) : (
        ""
      )}
    </div>
  );
}

export default Details;
