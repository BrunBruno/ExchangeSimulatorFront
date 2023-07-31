import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { onExpandElement } from "../../Shared/functions/components-function";

import classes from "./HomePage.module.scss";
import modalclasses from "./modal-section/Modal.module.scss";

import Header from "./header-section/Header";
import Hero from "./hero-section/Hero";
import SignInModal from "./modal-section/SignInModal";
import RegisterModal from "./modal-section/RegisterModal";
import EmailVerificationModal from "./modal-section/EmailVerificationModal";

function HomePage() {
  const location = useLocation();

  const signInModalRef = useRef(null);
  const registerModalRef = useRef(null);
  const emailVerificationModalRef = useRef(null);
  const infoPpupRef = useRef(null);

  const [signInModalOn, setSignInModalOn] = useState(false);
  const [registerModalOn, setRegisterModalOn] = useState(false);
  const [userIsPresent, setUserIspresent] = useState(false);

  const handlePopUp = (message) => {
    if (infoPpupRef.current) {
      infoPpupRef.current.classList.remove(classes["hidden-popup"]);
      infoPpupRef.current.innerHTML = message;
      setTimeout(() => {
        infoPpupRef.current.classList.add(classes["hidden-popup"]);
        setTimeout(() => {
          infoPpupRef.current.innerHTML = "";
        }, 2000);
      }, 3000);

      if (location.state && location.state.openEmailVerification) {
        handleEmailVerificationModal(true);
      }

      const updatedState = { ...location.state };
      delete updatedState.popup;

      window.history.replaceState(updatedState, "", location.pathname);
    }
  };

  useEffect(() => {
    if (location.state && location.state.popup) {
      handlePopUp(location.state.popup);
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
  const handleSignInModal = () => {
    if (!registerModalOn) {
      setSignInModalOn(!signInModalOn);

      onExpandElement(signInModalRef, modalclasses.hidden);
    }
  };

  // handel register modal
  const handleRegisterModal = () => {
    if (!signInModalOn) {
      setRegisterModalOn(!registerModalOn);

      onExpandElement(registerModalRef, modalclasses.hidden);
    }
  };

  // handle verification modal
  const handleEmailVerificationModal = (isOpen) => {
    if (isOpen) {
      if (!signInModalRef.current.classList.contains(modalclasses.hidden)) {
        signInModalRef.current.classList.add(modalclasses.hidden);
      }
      if (!registerModalRef.current.classList.contains(modalclasses.hidden)) {
        registerModalRef.current.classList.add(modalclasses.hidden);
      }
      emailVerificationModalRef.current.classList.remove(modalclasses.hidden);
    } else {
      setSignInModalOn(false);
      setRegisterModalOn(false);
      emailVerificationModalRef.current.classList.add(modalclasses.hidden);
    }
  };

  return (
    <div className={classes.container}>
      <Header
        handleSignInModal={handleSignInModal}
        handleRegisterModal={handleRegisterModal}
      />

      {(signInModalOn || registerModalOn) && (
        <div className={classes["form-bg"]}></div>
      )}
      <SignInModal
        handleSignInModal={handleSignInModal}
        handleEmailVerificationModal={handleEmailVerificationModal}
        modalRef={signInModalRef}
        handlePopUp={handlePopUp}
      />
      <RegisterModal
        handleRegisterModal={handleRegisterModal}
        handleEmailVerificationModal={handleEmailVerificationModal}
        modalRef={registerModalRef}
        handlePopUp={handlePopUp}
      />
      <EmailVerificationModal
        handleEmailVerificationModal={handleEmailVerificationModal}
        modalRef={emailVerificationModalRef}
        handlePopUp={handlePopUp}
      />

      <Hero
        handleRegisterModal={handleRegisterModal}
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
