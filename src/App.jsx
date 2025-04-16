import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Start from "./components/MainFunctionality/Start";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </div>
  );
};

export default App;
