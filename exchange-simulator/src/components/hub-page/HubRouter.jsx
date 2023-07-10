import { Route, Routes } from "react-router-dom";
import CreateGame from "./create/CreateGame";
import HubPage from "./hub/HubPage";

function HubRouter() {
  return (
    <Routes>
      <Route path="/" element={<HubPage />} />
      <Route path="/create" element={<CreateGame />} />
    </Routes>
  );
}

export default HubRouter;
