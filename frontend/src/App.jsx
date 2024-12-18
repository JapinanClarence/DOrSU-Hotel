import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
