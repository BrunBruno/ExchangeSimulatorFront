import { Route, Routes } from "react-router-dom";
import CreateGame from "./create/CreateGame";
import HubPage from "./hub/HubPage";
import Browser from "./browser/Browser";

function HubRouter() {
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
