import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./HomePage.module.scss";
import srclasses from "./signin-register-section/SigninRegister.module.scss";

import Header from "./header-section/Header";
import Hero from "./hero-section/Hero";
import SignIn from "./signin-register-section/SignIn";
import Register from "./signin-register-section/Register";
import EmailVerification from "./signin-register-section/EmailVerification";

function HomePage() {
  const location = useLocation();

  const signInPageRef = useRef(null);
  const registerPageRef = useRef(null);
  const emailVerificationPageRef = useRef(null);
  const infoPpupRef = useRef(null);

  const [signInPageOn, setSignInPageOn] = useState(false);
  const [registerPageOn, setRegisterPageOn] = useState(false);
  const [userIsPresent, setUserIspresent] = useState(false);

  useEffect(() => {
    if (location.state && location.state.popup) {
      infoPpupRef.current.classList.remove(classes["hidden-popup"]);
      infoPpupRef.current.innerHTML = location.state.popup;
      setTimeout(() => {
        infoPpupRef.current.classList.add(classes["hidden-popup"]);
        setTimeout(() => {
          infoPpupRef.current.innerHTML = "";
        }, 2000);
      }, 3000);

      if (location.state.openEmailVerification) {
        handleEmailVerificationPopUp(true);
      }

      const updatedState = { ...location.state };
      delete updatedState.popup;

      window.history.replaceState(updatedState, "", location.pathname);
    }
  }, [location.state]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserIspresent(true);
    } else {
      setUserIspresent(false);
    }
  }, []);

  // handle login modal
  const handleSignInPopUp = () => {
    if (!registerPageOn) {
      setSignInPageOn(!signInPageOn);

      if (signInPageRef.current.classList.contains(srclasses.hidden)) {
        signInPageRef.current.classList.remove(srclasses.hidden);
      } else {
        signInPageRef.current.classList.add(srclasses.hidden);
      }
    }
  };

  // handel register modal
  const handleRegisterPopUp = () => {
    if (!signInPageOn) {
      setRegisterPageOn(!registerPageOn);

      if (registerPageRef.current.classList.contains(srclasses.hidden)) {
        registerPageRef.current.classList.remove(srclasses.hidden);
      } else {
        registerPageRef.current.classList.add(srclasses.hidden);
      }
    }
  };

  // handle verification modal
  const handleEmailVerificationPopUp = (isOpen) => {
    if (isOpen) {
      if (!signInPageRef.current.classList.contains(srclasses.hidden)) {
        signInPageRef.current.classList.add(srclasses.hidden);
      }
      if (!registerPageRef.current.classList.contains(srclasses.hidden)) {
        registerPageRef.current.classList.add(srclasses.hidden);
      }
      emailVerificationPageRef.current.classList.remove(srclasses.hidden);
    } else {
      setSignInPageOn(false);
      setRegisterPageOn(false);
      emailVerificationPageRef.current.classList.add(srclasses.hidden);
    }
  };

  return (
    <div className={classes.container}>
      <Header
        handleSignInPopUp={handleSignInPopUp}
        handleRegisterPopUp={handleRegisterPopUp}
      />

      {(signInPageOn || registerPageOn) && (
        <div className={classes["form-bg"]}></div>
      )}
      <SignIn
        handleSignInPopUp={handleSignInPopUp}
        handleEmailVerificationPopUp={handleEmailVerificationPopUp}
        popupRef={signInPageRef}
      />
      <Register
        handleRegisterPopUp={handleRegisterPopUp}
        handleEmailVerificationPopUp={handleEmailVerificationPopUp}
        popupRef={registerPageRef}
      />
      <EmailVerification
        handleEmailVerificationPopUp={handleEmailVerificationPopUp}
        popupRef={emailVerificationPageRef}
      />

      <Hero
        handleRegisterPopUp={handleRegisterPopUp}
        userIsPresent={userIsPresent}
      />

      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      ></div>
    </div>
  );
}

export default HomePage;
