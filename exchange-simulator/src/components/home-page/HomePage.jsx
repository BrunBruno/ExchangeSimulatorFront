import { useRef, useState } from "react";

import classes from "./HomePage.module.scss";
import srclasses from "./signin-register-section/SigninRegister.module.scss";

import Header from "./header-section/Header";
import Hero from "./hero-section/Hero";
import SignIn from "./signin-register-section/SignIn";
import Register from "./signin-register-section/Register";
import EmailVerification from "./signin-register-section/EmailVerification";

function HomePage() {
  const signInPageRef = useRef(null);
  const registerPageRef = useRef(null);
  const emailVerificationPageRef = useRef(null);

  const [signInPageOn, setSignInPageOn] = useState(false);
  const [registerPageOn, setRegisterPageOn] = useState(false);

  // handle logil modal
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

      <Hero handleRegisterPopUp={handleRegisterPopUp} />
    </div>
  );
}

export default HomePage;
