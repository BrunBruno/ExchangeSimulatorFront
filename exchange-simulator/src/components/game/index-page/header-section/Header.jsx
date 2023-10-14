import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";

import Logo from "../../../Shared/svgs/Logo";
import LogOutSvg from "../../../Shared/svgs/LogOutSvg";
import UserSvg from "../../../Shared/svgs/UserSvg";

function Header() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const onLogOut = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div onClick={() => navigate("/hub")} className={classes["header__logo"]}>
        <Logo />
      </div>
      <div className={classes["header__nav"]}>
        <ul>
          <li onClick={() => navigate("/hub")}>Home</li>
        </ul>
      </div>
      <div className={classes["header__account"]}>
        <ul>
          <li>
            {userInfo === null || userInfo.imageUrl === null ? (
              <UserSvg />
            ) : (
              <img src={userInfo.imageUrl} alt="User Avatar" />
            )}
            <span>{userInfo.userName}</span>
          </li>
          <li onClick={onLogOut}>
            <LogOutSvg />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
