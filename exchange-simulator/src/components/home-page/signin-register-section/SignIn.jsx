import { useRef } from "react";
import axios from "axios";

import baseUrl from "../../Shared/Url";

import classes from "./SigninRegister.module.scss";

function SignIn(props) {
  const emailErrRef = useRef(null);
  const passwordErrRef = useRef(null);
  const mainErrRef = useRef(null);

  // Login user
  const loginUser = async (event) => {
    event.preventDefault();

    // Logging user object
    const userData = {
      email: event.target.email.value,
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
      localStorage.setItem("token", response.data.token);

      console.log("Logged in");

      const isEmailVerified = await axios.get(`${baseUrl}/user/is-verified`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!isEmailVerified.data.isEmailVerified) {
        props.handleEmailVerificationPopUp(true);
      }
    } catch (err) {
      console.log(err);

      // Display backend exeptions
      if (err.response && err.response.data) {
        emailErrRef.current.classList.add(classes.error);
        emailErrRef.current.innerHTML = err.response.data;
      } else {
        mainErrRef.current.classList.add(classes["main-error"]);
        mainErrRef.current.innerHTML = "Connection error.";
      }
    }
  };

  const clearErrors = () => {
    emailErrRef.current.innerHTML = "";
    passwordErrRef.current.innerHTML = "";
    emailErrRef.current.classList.remove(classes.error);
    passwordErrRef.current.classList.remove(classes.error);
  };

  return (
    <div
      ref={props.popupRef}
      className={`${classes["form-page"]} ${classes.hidden}`}
    >
      <form onSubmit={loginUser}>
        <div
          className={classes.x}
          onClick={() => {
            props.handleSignInPopUp();
            clearErrors();
          }}
        >
          <svg
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
              fill="#0b7285"
            />
          </svg>
        </div>
        <h2>Sign In</h2>
        <div className={classes["form-container"]}>
          <div>
            <span ref={mainErrRef}></span>
          </div>
          <div>
            <span>Email</span>
            <input type="text" name="email"></input>
            <span ref={emailErrRef}></span>
          </div>

          <div>
            <span>Password</span>
            <input type="password" name="password"></input>
            <span ref={passwordErrRef}></span>
          </div>

          <div className={classes.buttons}>
            <button type="submit">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
