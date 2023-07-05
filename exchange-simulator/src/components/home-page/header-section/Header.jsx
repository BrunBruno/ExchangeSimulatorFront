import classes from "./Header.module.scss";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes["header__logo"]}>Logo</div>
      <nav className={classes["header__nav"]}>
        <ul className={classes["header__nav__ul"]}>
          <li>Home</li>
          <li>About</li>
          <li>Register</li>
          <li>Sing In</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
