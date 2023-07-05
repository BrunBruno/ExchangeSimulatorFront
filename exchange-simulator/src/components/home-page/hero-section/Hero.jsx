import classes from "./Hero.module.scss";

function Hero() {
  return (
    <div className={classes.hero}>
      <div className={classes["hero__content"]}>
        <div className={classes["hero__content__into"]}>
          <h1>
            Welcome to <br /> Exchnage Simulatore
          </h1>
          <h2>
            Immerse yourself in the dynamic realm of financial markets through
            our exchange simulator game webpage, where you can test your trading
            strategies, learn new techniques, and compete with fellow virtual
            traders.
          </h2>
        </div>
      </div>

      <div className={classes["hero__intro_figure"]}>a</div>
    </div>
  );
}

export default Hero;
