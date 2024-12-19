import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
