import { Route, Routes } from "react-router-dom";

import HomePage from "./index-page/HomePage";
import AboutPage from "./about-page/AboutPage";

function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default HomeRouter;
