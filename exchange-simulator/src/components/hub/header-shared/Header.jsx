import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";

import Logo from "../../Shared/Logo";
import { useEffect, useRef } from "react";

function Header(props) {
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const onLogOut = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    navigate("/");
  };

  useEffect(() => {
    props.containerRef.current.addEventListener("scroll", () => {
      if (props.containerRef.current.scrollTop === 0) {
        headerRef.current.classList.add(classes["header-trans"]);
      } else {
        headerRef.current.classList.remove(classes["header-trans"]);
      }
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${classes.header} ${classes["header-trans"]}`}
    >
      <div onClick={() => navigate("/hub")} className={classes["header__logo"]}>
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
          <li>
            {userInfo === null || userInfo.imageUrl === null ? (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" stroke="#e3fafc" cx="12" cy="7" r="5" />
                <path
                  fill="none"
                  stroke="#e3fafc"
                  d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
                />
              </svg>
            ) : (
              <img src={userInfo.imageUrl} alt="User Avatar" />
            )}
            <span>{userInfo.userName}</span>
          </li>
          <li onClick={onLogOut}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                  stroke="#e3fafc"
                />
              </g>
            </svg>
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
