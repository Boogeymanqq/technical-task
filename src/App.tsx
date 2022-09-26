import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Busket } from "./pages/Busket/Busket";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busket" element={<Busket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
