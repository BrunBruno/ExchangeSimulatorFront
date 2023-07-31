import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";

import Logo from "../../../Shared/svgs/Logo";

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
              props.handleRegisterModal();
            }}
          >
            Register
          </li>
          <li
            onClick={() => {
              props.handleSignInModal();
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
