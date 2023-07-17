import { useState } from "react";

import classes from "./Details.module.scss";

function Details(props) {
  return (
    <div className={classes.details}>
      <div>
        <h3>{props.game.name}</h3>
        <p>by {props.game.ownerName}</p>
      </div>
      <div>
        <span>Description:</span>
        <p>{props.game.description}</p>
      </div>
      <div>
        <span>Started on:</span>
        <p>{new Date(props.game.createdAt).toLocaleString()}</p>
      </div>
      <div>
        <span>Will end on:</span>
        <p>{new Date(props.game.endGame).toLocaleString()}</p>
      </div>
      <div>
        <span>Available spots:</span>
        <p>{props.game.availableSpots}</p>
      </div>
      <button>Join Now</button>
    </div>
  );
}

export default Details;
