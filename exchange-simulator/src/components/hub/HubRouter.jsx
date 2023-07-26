import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import baseUrl from "../Shared/Url";

import CreateGame from "./create-page/CreateGame";
import HubPage from "./index-page/HubPage";
import Browser from "./browser-page/Browser";
import LoadingPage from "../Shared/LoadingPage";
import Manage from "./manage-page/Manage";

function HubRouter() {
  const [authorize, setAuthorize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUsersToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const isEmailVerified = await axios.get(
            `${baseUrl}/user/is-verified`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
          const user = await axios.get(`${baseUrl}/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

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
      <Route path="/create" element={<CreateGame />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/current-games" element={<Browser />} />
      <Route path="/available-games" element={<Browser />} />
      <Route path="/previous-games" element={<Browser />} />
    </Routes>
  );
}

export default HubRouter;
