import classes from "./Details.module.scss";

function Details(props) {
  const colors = [
    "#F5A623",
    "#F8E71C",
    "#7ED321",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#FF686B",
    "#FFD97D",
    "#66D9EF",
    "#FF75A0",
  ];

  return (
    <div className={classes.details}>
      <div className={classes["details__content"]}>
        <div className={classes["details__content__header"]}>
          <h2>{props.game.name}</h2>
        </div>

        <div className={classes["details__content__grid"]}>
          <div className={classes["details__content__grid__column"]}>
            <p>
              <span>Description:</span>
            </p>
            <textarea value={props.game.description}></textarea>
            <p>
              <span>Players Count: </span>
              {props.game.playerCount}
            </p>
            <p>
              <span>Available spots: </span>
              {props.game.availableSpots}
            </p>
            <p>
              <span>Created At: </span>
              {new Date(props.game.createdAt).toLocaleString()}
            </p>
            <p>
              <span>Ends At: </span>
              {new Date(props.game.endGame).toLocaleString()}
            </p>
            <p>
              <span>Starting money: </span>
              {props.game.money}$
            </p>

            <button>Start Now</button>
          </div>
          <div className={classes["details__content__grid__column"]}>
            <div className={classes.players}>
              {props.game.players.map((player, index) => {
                let color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <p key={index}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle fill="none" stroke={color} cx="12" cy="7" r="5" />
                      <path
                        fill="none"
                        stroke={color}
                        d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
                      />
                    </svg>
                    {player.name}
                  </p>
                );
              })}
            </div>
            <div className={classes.coins}>
              {props.game.coins.map((coin, index) => {
                let color = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <p>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke={color}
                      />
                    </svg>
                    <span>{coin.name}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
