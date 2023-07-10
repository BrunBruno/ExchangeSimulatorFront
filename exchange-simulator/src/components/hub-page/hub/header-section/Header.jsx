import classes from "./Header.module.scss";

import Logo from "../../../Shared/Logo";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes["header__logo"]}>
        <Logo />
      </div>
      <div className={classes["header__nav"]}>
        <ul>
          <li>acction 1</li>
          <li>acction 2</li>
          <li>acction 3</li>
          <li>acction 4</li>
        </ul>
      </div>
      <div className={classes["header__account"]}>
        <ul>
          <li>Account</li>
          <li>Log Out</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
