import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";

import HomePage from "./components/home-page/HomePage";
import HubPage from "./components/hub-page/hub/HubPage";
import HubRouter from "./components/hub-page/HubRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hub/*" element={<HubRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
