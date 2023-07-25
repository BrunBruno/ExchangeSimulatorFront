import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import baseUrl from "../../../Shared/Url";

import classes from "./SigninRegister.module.scss";
import ArrowSvg from "./ArrowSvg";

function SignIn(props) {
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
      const isEmailVerified = await axios.get(`${baseUrl}/user/is-verified`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!isEmailVerified.data.isEmailVerified) {
        // go to email verification
        props.handleEmailVerificationModal(true);
        props.handlePopUp("Please verify email.");
      } else {
        // go to hub page
        navigate("/hub");
      }
    } catch (err) {
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
            <span>Email</span>
            <input type="text" name="email" autoComplete=""></input>
            <span ref={emailErrRef}></span>
            <ArrowSvg />
          </div>

          <div>
            <span>Password</span>
            <input type="password" name="password" autoComplete=""></input>
            <span ref={passwordErrRef}></span>
            <ArrowSvg />
          </div>

          <div className={classes.buttons}>
            <button type="submit">Sign In</button>
          </div>
        </div>
        <div className={classes["form-bg"]}>
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 4C31.66 3.99825 35.2099 5.25133 38.0578 7.55025C40.9056 9.84917 42.8792 13.055 43.6494 16.6329C44.4196 20.2109 43.9398 23.9448 42.2901 27.2119C40.6405 30.4789 37.9205 33.0817 34.584 34.586C33.5176 36.9438 31.8951 39.0078 29.8558 40.6009C27.8165 42.1939 25.4212 43.2686 22.8753 43.7327C20.3295 44.1968 17.709 44.0364 15.2388 43.2654C12.7685 42.4943 10.5221 41.1356 8.69227 39.3058C6.86242 37.4759 5.50372 35.2295 4.73268 32.7593C3.96164 30.289 3.80129 27.6686 4.26537 25.1227C4.72945 22.5769 5.80411 20.1816 7.39719 18.1423C8.99027 16.103 11.0542 14.4805 13.4121 13.414C14.6803 10.6078 16.7312 8.227 19.3187 6.55722C21.9063 4.88743 24.9205 3.99953 28 4ZM22 18H18.0001V20C16.7003 19.9968 15.4504 20.4999 14.5152 21.4027C13.5801 22.3054 13.0332 23.5368 12.9906 24.8359C12.9479 26.135 13.4128 27.3996 14.2867 28.3618C15.1606 29.3239 16.3749 29.9079 17.6721 29.99L18.0001 30H22L22.18 30.016C22.4106 30.0577 22.6192 30.1791 22.7694 30.359C22.9196 30.5388 23.0019 30.7657 23.0019 31C23.0019 31.2343 22.9196 31.4612 22.7694 31.641C22.6192 31.8209 22.4106 31.9423 22.18 31.984L22 32H14.0001V36H18.0001V38H22V36C23.2998 36.0032 24.5497 35.5001 25.4849 34.5973C26.42 33.6946 26.9669 32.4632 27.0095 31.1641C27.0522 29.865 26.5873 28.6004 25.7134 27.6383C24.8395 26.6761 23.6252 26.0921 22.328 26.01L22 26H18.0001L17.8201 25.984C17.5895 25.9423 17.3809 25.8209 17.2307 25.641C17.0805 25.4612 16.9982 25.2343 16.9982 25C16.9982 24.7657 17.0805 24.5388 17.2307 24.359C17.3809 24.1791 17.5895 24.0577 17.8201 24.016L18.0001 24H26V20H22V18ZM28 8C26.3054 7.99802 24.6297 8.35588 23.0837 9.04992C21.5377 9.74396 20.1567 10.7584 19.0321 12.026C21.2926 11.8888 23.5565 12.233 25.6741 13.0359C27.7916 13.8388 29.7147 15.0821 31.3159 16.6836C32.9172 18.285 34.1603 20.2082 34.9629 22.3259C35.7656 24.4435 36.1095 26.7075 35.972 28.968C37.7905 27.3512 39.0745 25.2199 39.6537 22.8566C40.2329 20.4934 40.08 18.0098 39.2153 15.7354C38.3506 13.4611 36.8149 11.5033 34.8119 10.1218C32.8089 8.74025 30.4333 8.00028 28 8Z"
              fill="#e3fafc"
            />
          </svg>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
