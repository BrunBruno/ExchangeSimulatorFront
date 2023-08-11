import { useState } from "react";

import { DetailsOptions } from "../GamePageOptions";

import classes from "./Details.module.scss";

import Stats from "./Stats";
import Plot from "./Plot";
import Ranking from "./Ranking";

import NavIcons from "./NavIcons";

function Details(props) {
  const [selectedoption, setSelectedOption] = useState(DetailsOptions.stats);

  return (
    <div className={classes.details}>
      <nav className={classes["details__navigation"]}>
        {selectedoption === DetailsOptions.stats ? (
          <h2>Stats</h2>
        ) : selectedoption === DetailsOptions.ranking ? (
          <h2>Ranking</h2>
        ) : selectedoption === DetailsOptions.plot ? (
          <h2>Plot</h2>
        ) : (
          ""
        )}
        <ul className={classes["details__navigation__list"]}>
          <li
            className={
              selectedoption === DetailsOptions.stats ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.stats);
            }}
          >
            <NavIcons
              name="stats"
              active={selectedoption === DetailsOptions.stats}
            />
          </li>
          <li
            className={
              selectedoption === DetailsOptions.ranking ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.ranking);
            }}
          >
            <NavIcons
              name="ranking"
              active={selectedoption === DetailsOptions.ranking}
            />
          </li>
          <li
            className={
              selectedoption === DetailsOptions.plot ? classes.active : ""
            }
            onClick={() => {
              setSelectedOption(DetailsOptions.plot);
            }}
          >
            <NavIcons
              name="plot"
              active={selectedoption === DetailsOptions.plot}
            />
          </li>
        </ul>
      </nav>
      {selectedoption === DetailsOptions.stats ? (
        <Stats playerInfo={props.playerInfo} />
      ) : selectedoption === DetailsOptions.ranking ? (
        <Ranking gameName={props.gameName} playerInfo={props.playerInfo} />
      ) : selectedoption === DetailsOptions.plot ? (
        <Plot />
      ) : (
        ""
      )}
    </div>
  );
}

export default Details;
