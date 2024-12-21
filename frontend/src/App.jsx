import HomePage from "./pages/HomePage";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ReservationsPage from "./pages/ReservationsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TransactionsPage from "./pages/TransactionsPage";
import RoomsPage from "./pages/RoomsPage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/rooms" element={<RoomsPage />} />

            <Route
              path="/"
              element={<ProtectedRoutes allowedRoles={["guest", "admin"]} />}
            >
              <Route path="/reservations" element={<ReservationsPage />} />
            </Route>
            <Route
              path="/"
              element={<ProtectedRoutes allowedRoles={["guest"]} />}
            >
              <Route path="/reservations/checkout" element={<CheckoutPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
