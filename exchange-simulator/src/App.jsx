import { BrowserRouter, Routes, Route } from "react-router-dom";

import classes from "./App.module.scss";

import HubRouter from "./components/hub/HubRouter";
import HomeRouter from "./components/home/HomeRouter";
import GameRouter from "./components/game/GameRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <div className={classes.background} />
              <HomeRouter />
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
        <Route
          path="/game/*"
          element={
            <>
              <div className={classes.background} />
              <GameRouter />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
