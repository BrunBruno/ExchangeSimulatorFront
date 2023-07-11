import classes from "./Content.module.scss";

function Content(props) {
  return (
    <div className={classes.content}>
      <h1>{props.option.title}</h1>
    </div>
  );
}

export default Content;
