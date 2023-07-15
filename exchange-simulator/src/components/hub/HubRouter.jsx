import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import baseUrl from "../Shared/Url";

import CreateGame from "./create-page/CreateGame";
import HubPage from "./index-page/HubPage";
import Browser from "./browser-page/Browser";
import LoadingPage from "../Shared/LoadingPage";

function HubRouter() {
  const [authorize, setAuthorize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUsersToken = async () => {
      try {
        const isEmailVerified = await axios.get(`${baseUrl}/user/is-verified`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!isEmailVerified.data.isEmailVerified) {
          navigate("/");
        }

        setAuthorize(true);
      } catch (err) {
        navigate("/");
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
      <Route path="/current-games" element={<Browser />} />
      <Route path="/available-games" element={<Browser />} />
      <Route path="/previous-games" element={<Browser />} />
    </Routes>
  );
}

export default HubRouter;
