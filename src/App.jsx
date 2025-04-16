import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AudioProcessor from "./components/MainFunctionality/AudioProcessor";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listen" element={<AudioProcessor />} />
      </Routes>
    </div>
  );
};

export default App;
