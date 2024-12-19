import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ReservationPage from "./pages/ReservationPage";

function App() {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<ProtectedRoutes allowedRoles={["guest"]} />}>
              <Route path="/reservations" element={<ReservationPage/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
