import { useEffect, useState } from "react";

import classes from "./Card.module.scss";

function Card(props) {
  const [randomStyle, setRandomStyle] = useState("");

  useEffect(() => {
    const styles = [
      "content-style-1",
      "content-style-2",
      "content-style-3",
      "content-style-4",
      "content-style-5",
      "content-style-6",
      "content-style-7",
      "content-style-8",
      "content-style-9",
    ];
    const randomIndex = Math.floor(Math.random() * styles.length);
    setRandomStyle(classes[styles[randomIndex]]);
  }, []);

  return (
    <div ref={props.cardRef} className={classes.card}>
      <div className={`${classes["card__content"]} ${randomStyle}`}>
        <div className={classes.text}>
          <h2>{props.name}</h2>
          <p>by {props.owner}</p>
        </div>
        <div className={classes.buttons}>
          <button>Join</button>
          <button>Select</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
