import { useState } from "react";

import { DetailsOptions } from "../GamePageOptions";

import classes from "./Details.module.scss";

import Stats from "./Stats";
import Plot from "./Plot";
import NavIcons from "./NavIcons";

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
