import classes from "./Tutorial.module.scss";

function Tutorial(props) {
  return (
    <div
      className={classes.tutorial}
      style={props.tutorialVisible ? { display: "block" } : { display: "none" }}
      onClick={() => {
        props.setTutorialVisible(false);
      }}
    >
      <div
        className={classes.element}
        style={{ left: "10rem", top: "10rem", rotate: "5deg" }}
      >
        <p>Create new limit order</p>
        <svg
          fill="#aaa"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{ transform: "scaleY(-1)" }}
        >
          <g>
            <path
              d="M25,27.8c-0.5,0-0.9-0.3-1-0.8l0-0.2c-1-4.4-4.6-7.5-9-8v3.5c0,0.8-0.5,1.5-1.2,1.8c-0.8,0.3-1.6,0.1-2.2-0.4l-8.3-8.3
    c-0.4-0.4-0.4-1,0-1.4l8.3-8.3C12.2,5.2,13,5,13.8,5.4c0.8,0.3,1.2,1,1.2,1.8v3.6c6.2,0.5,11,5.7,11,12v4c0,0.5-0.4,0.9-0.9,1
    C25.1,27.8,25,27.8,25,27.8z"
            />
          </g>
        </svg>
        {/* <span>
          Set up price and amount you would like to buy/sell. The order will be
          automaticly realized when your criteria are met. You can always update
          your order.
        </span> */}
      </div>

      <div
        className={classes.element}
        style={{ left: "5rem", top: "26rem", rotate: "-5deg" }}
      >
        <svg fill="#aaa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g>
            <path
              d="M25,27.8c-0.5,0-0.9-0.3-1-0.8l0-0.2c-1-4.4-4.6-7.5-9-8v3.5c0,0.8-0.5,1.5-1.2,1.8c-0.8,0.3-1.6,0.1-2.2-0.4l-8.3-8.3
    c-0.4-0.4-0.4-1,0-1.4l8.3-8.3C12.2,5.2,13,5,13.8,5.4c0.8,0.3,1.2,1,1.2,1.8v3.6c6.2,0.5,11,5.7,11,12v4c0,0.5-0.4,0.9-0.9,1
    C25.1,27.8,25,27.8,25,27.8z"
            />
          </g>
        </svg>
        <p>Create new market order</p>
        {/* <span>
          Set up the amount of coins you would like to buy/sell and it will
          instantly realize your order with best price available on marekt.
        </span> */}
      </div>

      <div
        className={classes.element}
        style={{ left: "30rem", top: "60rem", rotate: "0deg" }}
      >
        <div className={classes.buckleleft} />
        <div className={classes.buckleright} />
        <p>All orders are displayed here</p>
      </div>

      <div
        className={classes.element}
        style={{ left: "60rem", top: "5rem", rotate: "-10deg" }}
      >
        <p>See all marektplaces</p>
        <div className={classes.ellipse} />
      </div>

      <div
        className={classes.element}
        style={{ left: "105rem", top: "5rem", rotate: "0deg" }}
      >
        <p>Display stats.</p>
        <p>or</p>
        <p>See ranking</p>
        <p>or</p>
        <p>View charts</p>
      </div>

      <div
        className={classes.element}
        style={{ left: "128rem", top: "40rem", rotate: "-20deg" }}
      >
        <p>Manage your orders.</p>
        <svg
          fill="#aaa"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{
            transform: "scaleY(-1) scaleX(-1)",
            position: "absolute",
            right: "0",
          }}
        >
          <g>
            <path
              d="M25,27.8c-0.5,0-0.9-0.3-1-0.8l0-0.2c-1-4.4-4.6-7.5-9-8v3.5c0,0.8-0.5,1.5-1.2,1.8c-0.8,0.3-1.6,0.1-2.2-0.4l-8.3-8.3
    c-0.4-0.4-0.4-1,0-1.4l8.3-8.3C12.2,5.2,13,5,13.8,5.4c0.8,0.3,1.2,1,1.2,1.8v3.6c6.2,0.5,11,5.7,11,12v4c0,0.5-0.4,0.9-0.9,1
    C25.1,27.8,25,27.8,25,27.8z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Tutorial;
