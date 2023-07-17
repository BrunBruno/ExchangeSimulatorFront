import { useRef, useState } from "react";
import Header from "../header-shared/Header";
import classes from "./Manage.module.scss";
import Details from "./details-section/Details";

function Manage() {
  const containerRef = useRef(null);

  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div ref={containerRef} className={classes.manage}>
      <Header containerRef={containerRef} />
      <div className={classes["manage__games"]}>
        <div className={classes["manage__games__bar"]}>
          <h2>Manage your games.</h2>
          <input type="text" />
        </div>
        <div className={classes["manage__games__list"]}>
          <div className={classes["manage__games__list__header"]}>
            <span>Game Name</span>
            <span>Players</span>
            <span>Started At</span>
            <span>Ends At</span>
          </div>
          <ul>
            <li>
              <span>Game Name</span>
              <span>Players</span>
              <span>Started At</span>
              <span>Ends At</span>
            </li>
            <li>
              <span>Game Name</span>
              <span>Players</span>
              <span>Started At</span>
              <span>Ends At</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes["manage__details"]}>
        {selectedGame !== null ? (
          <div className={classes.info}>
            <h3>Hello</h3>
            <p>No game selected.</p>
            <p>Please select game to manage it.</p>
          </div>
        ) : (
          <Details />
        )}
      </div>
    </div>
  );
}

export default Manage;
