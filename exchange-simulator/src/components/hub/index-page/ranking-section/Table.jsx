import classes from "./Table.module.scss";

function Table() {
  return (
    <div className={classes.table}>
      <div className={classes["table__header"]}>
        <ul>
          <li>No.</li>
          <li>User Name</li>
          <li>Best Score</li>
          <li>Total Score</li>
        </ul>
      </div>
      <div className={classes["table__content"]}>
        <ul>
          <li>
            <span>1</span>
            <span>marek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>marek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>marek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>marek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>marek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jarek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
          <li>
            <span>1</span>
            <span>jurek</span>
            <span>1000</span>
            <span>100000</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Table;
