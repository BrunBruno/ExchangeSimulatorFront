import classes from "./LoadingPage.module.scss";

function LoadingPage() {
  return (
    <>
      {" "}
      <div className={classes.loading}></div>
      <div className={`${classes.loading2} ${classes.loading}`}></div>{" "}
    </>
  );
}

export default LoadingPage;
