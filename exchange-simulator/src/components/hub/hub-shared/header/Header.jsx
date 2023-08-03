import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";

import Logo from "../../../Shared/svgs/Logo";
import LogOutSvg from "../../../Shared/svgs/LogOutSvg";

function Header(props) {
  const headerRef = useRef(null);

  const location = useLocation();
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
      <div
        onClick={() => {
          if (location.pathname === "/hub") {
            navigate("/");
          } else {
            navigate("/hub");
          }
        }}
        className={classes["header__logo"]}
      >
        <Logo />
      </div>
      <div className={classes["header__nav"]}>
        <ul>
          <li onClick={() => navigate("/hub")}>Home</li>
          <li onClick={() => navigate("/hub/create")}>Create</li>
          <li onClick={() => navigate("/hub/manage")}>Manage</li>
          <li
            onClick={() => {
              navigate("/hub/current-games", {
                state: { title: "current-games" },
              });
            }}
          >
            Rejoin
          </li>
          <li
            onClick={() =>
              navigate("/hub/available-games", {
                state: { title: "available-games" },
              })
            }
          >
            Search
          </li>
          <li
            onClick={() =>
              navigate("/hub/previous-games", {
                state: { title: "previous-games" },
              })
            }
          >
            Inspect
          </li>
          <li onClick={() => navigate("/hub/ranking")}>Ranking</li>
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
            <LogOutSvg />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
