import { Route, Routes } from "react-router-dom";

import HomePage from "./index-page/HomePage";
import About from "./about-page/About";

function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default HomeRouter;
