import { useRef } from "react";
import axios from "axios";

import { baseUrl } from "../../../Shared/options/ApiOptions";

import classes from "./Modal.module.scss";

import ModalArrowSvg from "./ModalArrowSvg";
import XSvg from "../../../Shared/svgs/XSvg";
import CoinsSvg from "../../../Shared/svgs/CoinsSvg";

function RegisterModal(props) {
  const emailErrRef = useRef(null);
  const userNameErrRef = useRef(null);
  const passwordErrRef = useRef(null);

  // Register user
  const registerUser = async (event) => {
    event.preventDefault();

    // Register user object
    const userData = {
      email: event.target.email.value.trim(),
      userName: event.target.userName.value.trim(),
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };

    // Check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      emailErrRef.current.classList.add(classes.error);
      emailErrRef.current.innerHTML = "Email is not valid.";
      return;
    } else {
      emailErrRef.current.classList.remove(classes.error);
      emailErrRef.current.innerHTML = "";
    }

    // Check username length
    if (userData.userName.length > 30 || userData.userName.length < 5) {
      userNameErrRef.current.classList.add(classes.error);
      userNameErrRef.current.innerHTML =
        "Username must be between 5 and 30 characters.";
      return;
    } else {
      userNameErrRef.current.classList.remove(classes.error);
      userNameErrRef.current.innerHTML = "";
    }

    // Check for minimal password length
    if (userData.password.length < 5) {
      passwordErrRef.current.classList.add(classes.error);
      passwordErrRef.current.innerHTML =
        "Password must have at least 5 characters.";
      return;
    } else {
      passwordErrRef.current.classList.remove(classes.error);
      passwordErrRef.current.innerHTML = "";
    }

    // Check for posword not containing whitespaces
    if (userData.password.indexOf(" ") >= 0) {
      passwordErrRef.current.classList.add(classes.error);
      passwordErrRef.current.innerHTML = "Password can't contain whitespaces.";
      return;
    } else {
      passwordErrRef.current.classList.remove(classes.error);
      passwordErrRef.current.innerHTML = "";
    }

    // Check for password match
    if (userData.password !== userData.confirmPassword) {
      passwordErrRef.current.classList.add(classes.error);
      passwordErrRef.current.innerHTML =
        "Password and Confirm Password don't match";
      return;
    } else {
      passwordErrRef.current.classList.remove(classes.error);
      passwordErrRef.current.innerHTML = "";
    }

    try {
      // Register new user
      await axios.post(`${baseUrl}/user/register`, userData);

      const logUserData = {
        email: event.target.email.value.trim(),
        password: event.target.password.value,
      };

      // save user details
      localStorage.setItem("userTemp", JSON.stringify(logUserData));

      // log in new user
      const response = await axios.post(`${baseUrl}/user/sign-in`, logUserData);

      // set token
      localStorage.setItem("token", response.data.token);

      // go to email verification
      props.handleEmailVerificationModal(true);

      // display popup
      props.setPopupContent("Account created.");
    } catch (err) {
      // Display backend exeptions
      if (err.response && err.response.data) {
        emailErrRef.current.classList.add(classes.error);
        emailErrRef.current.innerHTML = err.response.data;
      } else {
        // display popup
        props.setPopupContent("Connection error.");
      }
    }
  };

  // clear errors
  const clearErrors = () => {
    emailErrRef.current.innerHTML = "";
    userNameErrRef.current.innerHTML = "";
    passwordErrRef.current.innerHTML = "";
    emailErrRef.current.classList.remove(classes.error);
    userNameErrRef.current.classList.remove(classes.error);
    passwordErrRef.current.classList.remove(classes.error);
  };

  return (
    <div
      ref={props.modalRef}
      className={`${classes["form-page"]} ${classes.hidden}`}
    >
      <form onSubmit={registerUser}>
        <div
          className={classes.x}
          onClick={() => {
            props.handleRegisterModal();
            clearErrors();
          }}
        >
          <XSvg />
        </div>
        <h2>Register</h2>
        <div className={classes["form-container"]}>
          <div>
            <span>Email</span>
            <input type="text" name="email"></input>
            <span ref={emailErrRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>
          <div>
            <span>Nick Name</span>
            <input type="text" name="userName" autoComplete="userName"></input>
            <span ref={userNameErrRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>
          <div>
            <span>Password</span>
            <input type="password" name="password" autoComplete=""></input>
            <span ref={passwordErrRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>
          <div>
            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete=""
            ></input>
            <ModalArrowSvg className={classes.arrow} />
          </div>
          <div className={classes.buttons}>
            <button type="submit">Register</button>
          </div>
        </div>
        <div className={classes["form-bg"]}>
          <CoinsSvg />
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
