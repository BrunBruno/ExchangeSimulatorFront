import classes from "./HomePage.module.scss";

import Header from "./header-section/Header";
import Hero from "./hero-section/Hero";
import SignIn from "./signin-register-section/SignIn";
import Register from "./signin-register-section/Register";

import { useRef, useState } from "react";

function HomePage() {
  const signInPageRef = useRef(null);
  const registerPageRef = useRef(null);
  const [signInPageOn, setSignInPageOn] = useState(false);
  const [registerPageOn, setRegisterPageOn] = useState(false);

  const handleSignInPopUp = () => {
    if (!registerPageOn) {
      setSignInPageOn(!signInPageOn);

      if (signInPageRef.current.classList.contains(classes.hidden)) {
        signInPageRef.current.classList.remove(classes.hidden);
      } else {
        signInPageRef.current.classList.add(classes.hidden);
      }
    }
  };
  const handleRegisterPopUp = () => {
    if (!signInPageOn) {
      setRegisterPageOn(!registerPageOn);

      if (registerPageRef.current.classList.contains(classes.hidden)) {
        registerPageRef.current.classList.remove(classes.hidden);
      } else {
        registerPageRef.current.classList.add(classes.hidden);
      }
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
      <SignIn handleSignInPopUp={handleSignInPopUp} popupRef={signInPageRef} />
      <Register
        handleRegisterPopUp={handleRegisterPopUp}
        popupRef={registerPageRef}
      />

      <Hero handleRegisterPopUp={handleRegisterPopUp} />
    </div>
  );
}

export default HomePage;
