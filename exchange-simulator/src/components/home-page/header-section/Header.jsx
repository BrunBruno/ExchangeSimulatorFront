import classes from "./Header.module.scss";

import Logo from "../../Shared/Logo";

function Header(props) {
  return (
    <header className={classes.header}>
      <div className={classes["header__logo"]}>
        <Logo />
      </div>
      <nav className={classes["header__nav"]}>
        <ul>
          <li
            onClick={() => {
              location.reload();
            }}
          >
            Home
          </li>
          <li>About</li>
          <li onClick={props.handleRegisterPopUp}>Register</li>
          <li onClick={props.handleSignInPopUp}>Sign In</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
