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
import usePopup from "../../Shared/hooks/usePopup ";

function HomePage() {
  const location = useLocation();

  const [userIsPresent, setUserIspresent] = useState(false);

  // modals options
  const signInModalRef = useRef(null);
  const registerModalRef = useRef(null);
  const emailVerificationModalRef = useRef(null);
  const [signInModalOn, setSignInModalOn] = useState(false);
  const [registerModalOn, setRegisterModalOn] = useState(false);

  // pop up options
  const [infoPpupRef, popupContent, setPopupContent] = usePopup(
    classes["hidden-popup"]
  );

  useEffect(() => {
    if (location.state) {
      if (location.state.openEmailVerification) {
        handleEmailVerificationModal(true);

        const updatedState = { ...location.state };
        delete updatedState.openEmailVerification;

        window.history.replaceState(updatedState, "", location.pathname);
      }
    }
  }, [location.state]);

  // check if user is present
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
        // handlePopUp={handlePopUp}
        setPopupContent={setPopupContent}
      />
      <RegisterModal
        handleRegisterModal={handleRegisterModal}
        handleEmailVerificationModal={handleEmailVerificationModal}
        modalRef={registerModalRef}
        // handlePopUp={handlePopUp}
        setPopupContent={setPopupContent}
      />
      <EmailVerificationModal
        handleEmailVerificationModal={handleEmailVerificationModal}
        modalRef={emailVerificationModalRef}
        // handlePopUp={handlePopUp}
        setPopupContent={setPopupContent}
      />

      <Hero
        handleRegisterModal={handleRegisterModal}
        userIsPresent={userIsPresent}
      />

      <div
        ref={infoPpupRef}
        className={`${classes.popup} ${classes["hidden-popup"]}`}
      >
        {popupContent}
      </div>
    </div>
  );
}

export default HomePage;
