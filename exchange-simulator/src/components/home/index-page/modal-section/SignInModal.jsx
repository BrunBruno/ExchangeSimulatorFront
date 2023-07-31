import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";

import classes from "./Modal.module.scss";

import ModalArrowSvg from "./ModalArrowSvg";
import XSvg from "../../../Shared/svgs/XSvg";
import CoinsSvg from "../../../Shared/svgs/CoinsSvg";

function SignInModal(props) {
  const emailErrRef = useRef(null);
  const passwordErrRef = useRef(null);

  const navigate = useNavigate();

  // Login user
  const loginUser = async (event) => {
    event.preventDefault();

    // Logging user object
    const userData = {
      email: event.target.email.value.trim(),
      password: event.target.password.value,
    };

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      emailErrRef.current.classList.add(classes.error);
      emailErrRef.current.innerHTML = "Email is not valid.";
      return;
    } else {
      emailErrRef.current.classList.remove(classes.error);
      emailErrRef.current.innerHTML = "";
    }

    // Check for empty password
    if (userData.password.length === 0) {
      passwordErrRef.current.classList.add(classes.error);
      passwordErrRef.current.innerHTML = "Password can not be empty.";
      return;
    } else {
      passwordErrRef.current.classList.remove(classes.error);
      passwordErrRef.current.innerHTML = "";
    }

    try {
      // Log in user
      const response = await axios.post(`${baseUrl}/user/sign-in`, userData);

      // set token
      localStorage.setItem("token", response.data.token);

      // users email verification check
      const isEmailVerified = await axios.get(
        `${baseUrl}/user/is-verified`,
        authorization(localStorage.getItem("token"))
      );

      if (!isEmailVerified.data.isEmailVerified) {
        // go to email verification
        props.handleEmailVerificationModal(true);
        props.handlePopUp("Please verify email.");
      } else {
        // go to hub page
        navigate("/hub");
      }
    } catch (err) {
      console.log(err);
      // Display backend exeptions
      if (err.response && err.response.data) {
        emailErrRef.current.classList.add(classes.error);
        emailErrRef.current.innerHTML = err.response.data;
      } else {
        props.handlePopUp("Connection error.");
      }
    }
  };

  // clear errors
  const clearErrors = () => {
    emailErrRef.current.innerHTML = "";
    passwordErrRef.current.innerHTML = "";
    emailErrRef.current.classList.remove(classes.error);
    passwordErrRef.current.classList.remove(classes.error);
  };

  return (
    <div
      ref={props.modalRef}
      className={`${classes["form-page"]} ${classes.hidden}`}
    >
      <form onSubmit={loginUser}>
        <div
          className={classes.x}
          onClick={() => {
            props.handleSignInModal();
            clearErrors();
          }}
        >
          <XSvg />
        </div>
        <h2>Sign In</h2>
        <div className={classes["form-container"]}>
          <div>
            <span>Email</span>
            <input type="text" name="email" autoComplete=""></input>
            <span ref={emailErrRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>

          <div>
            <span>Password</span>
            <input type="password" name="password" autoComplete=""></input>
            <span ref={passwordErrRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>

          <div className={classes.buttons}>
            <button type="submit">Sign In</button>
          </div>
        </div>
        <div className={classes["form-bg"]}>
          <CoinsSvg />
        </div>
      </form>
    </div>
  );
}

export default SignInModal;
