import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";

import classes from "./Modal.module.scss";

import XSvg from "../../../Shared/svgs/XSvg";
import CoinsSvg from "../../../Shared/svgs/CoinsSvg";
import ModalArrowSvg from "./ModalArrowSvg";

function EmailVerificationModal(props) {
  const navigate = useNavigate();

  const codeRef = useRef(null);

  // verify code
  const verify = async (event) => {
    event.preventDefault();

    // Code object
    const verificationCode = {
      code: event.target.code.value,
    };

    // Check if user puts code
    if (verificationCode.code.length === 0) {
      codeRef.current.classList.add(classes.error);
      codeRef.current.innerHTML = "Please enter the code.";
    } else {
      codeRef.current.classList.remove(classes.error);
      codeRef.current.innerHTML = "";
    }

    try {
      // Verify code
      await axios.put(
        `${baseUrl}/user/verify-email`,
        verificationCode,
        authorization(localStorage.getItem("token"))
      );

      // log in again user for token refresh
      const response = await axios.post(
        `${baseUrl}/user/sign-in`,
        JSON.parse(localStorage.getItem("userTemp"))
      );

      // remove user temp
      localStorage.removeItem("userTemp");

      // set token
      localStorage.setItem("token", response.data.token);

      // go to hub page
      navigate("/hub", {
        state: {
          popup: "Email verified.",
        },
      });
    } catch (err) {
      // Display backend exeptions
      if (err.response && err.response.data) {
        codeRef.current.classList.add(classes.error);
        codeRef.current.innerHTML = err.response.data;
      } else {
        // display popup
        props.setPopupContent("Connection error.");
      }
    }
  };

  // regenrate code
  const regenerateCode = async () => {
    try {
      // Generate new code and delete previous
      await axios.post(
        `${baseUrl}/user/regenerate-code`,
        {},
        authorization(localStorage.getItem("token"))
      );

      // display popup
      props.setPopupContent("Email resend.");
    } catch (err) {
      // Display backend exeptions
      if (err.response && err.response.data) {
        codeRef.current.classList.add(classes.error);
        codeRef.current.innerHTML = err.response.data;
      } else {
        // display popup
        props.setPopupContent("Connection error.");
      }
    }
  };

  const clearErrors = () => {
    codeRef.current.classList.remove(classes.error);
    codeRef.current.innerHTML = "";
  };

  return (
    <div
      ref={props.modalRef}
      className={`${classes["form-page"]} ${classes.hidden}`}
    >
      <form onSubmit={verify}>
        <div
          className={classes.x}
          onClick={() => {
            props.handleEmailVerificationModal(false);
            clearErrors();
          }}
        >
          <XSvg />
        </div>
        <h2>Email Verification</h2>
        <div className={classes["form-container"]}>
          <div>
            <p>
              We sent you verification code to your email. Please enter the code
              to verify your accout.
            </p>
          </div>
          <div>
            <span>Enter code</span>
            <input type="number" name="code" autoComplete=""></input>
            <span ref={codeRef}></span>
            <ModalArrowSvg className={classes.arrow} />
          </div>
          <div className={classes.buttons}>
            <button type="button" onClick={regenerateCode}>
              Resend
            </button>
            <button type="submit">Verify</button>
          </div>
        </div>
        <div className={classes["form-bg"]}>
          <CoinsSvg />
        </div>
      </form>
    </div>
  );
}

export default EmailVerificationModal;
