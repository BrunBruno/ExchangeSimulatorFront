import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";

import HomePage from "./components/home-page/home/HomePage";
import HubRouter from "./components/hub-page/HubRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={classes.background} />
              <HomePage />
            </>
          }
        />
        <Route
          path="/hub/*"
          element={
            <>
              <div className={classes.background} />
              <HubRouter />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
