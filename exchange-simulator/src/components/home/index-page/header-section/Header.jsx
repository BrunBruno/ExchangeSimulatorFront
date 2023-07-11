import classes from "./Header.module.scss";

import Logo from "../../../Shared/Logo";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div
        className={classes["header__logo"]}
        onClick={() => {
          location.reload();
        }}
      >
        <Logo />
      </div>
      <nav className={classes["header__nav"]}>
        <ul>
          <li
            onClick={() => {
              navigate("/hub");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </li>
          <li
            onClick={() => {
              props.handleRegisterPopUp();
            }}
          >
            Register
          </li>
          <li
            onClick={() => {
              props.handleSignInPopUp();
            }}
          >
            Sign In
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
