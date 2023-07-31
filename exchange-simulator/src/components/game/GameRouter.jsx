import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { baseUrl, authorization } from "../Shared/options/ApiOptions";

import LoadingPage from "../Shared/pages/loading-page/LoadingPage";
import GamePage from "./index-page/GamePage";

function GameRouter() {
  const [authorize, setAuthorize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUsersToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const isEmailVerified = await axios.get(
            `${baseUrl}/user/is-verified`,
            authorization(localStorage.getItem("token"))
          );

          if (!isEmailVerified.data.isEmailVerified) {
            navigate("/", {
              state: {
                popup: "Please verify email.",
                openEmailVerification: true,
              },
            });
          }

          // get user info
          const user = await axios.get(
            `${baseUrl}/user`,
            authorization(localStorage.getItem("token"))
          );

          // set user info
          localStorage.setItem("userInfo", JSON.stringify(user.data));

          setAuthorize(true);
        } catch (err) {
          navigate("/", {
            state: { popup: "Connection error." },
          });
        }
      } else {
        navigate("/", {
          state: { popup: "Please sign in." },
        });
      }
    };

    verifyUsersToken();
  }, []);

  if (!authorize) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/:gameName" element={<GamePage />} />
    </Routes>
  );
}

export default GameRouter;
