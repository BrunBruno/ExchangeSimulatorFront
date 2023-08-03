import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../Shared/options/ApiOptions";

import CreateGamePage from "./create-page/CreateGamePage";
import HubPage from "./index-page/HubPage";
import BrowserPage from "./browser-page/BrowserPage";
import LoadingPage from "../Shared/pages/loading-page/LoadingPage";
import ManageGamePage from "./manage-game-page/ManageGamePage";

function HubRouter() {
  const navigate = useNavigate();

  const [authorize, setAuthorize] = useState(false);

  useEffect(() => {
    const verifyUsersToken = async () => {
      if (localStorage.getItem("token")) {
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
      <Route path="/" element={<HubPage />} />
      <Route path="/create" element={<CreateGamePage />} />
      <Route path="/manage" element={<ManageGamePage />} />
      <Route path="/current-games" element={<BrowserPage />} />
      <Route path="/available-games" element={<BrowserPage />} />
      <Route path="/previous-games" element={<BrowserPage />} />
    </Routes>
  );
}

export default HubRouter;
