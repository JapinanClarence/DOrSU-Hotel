import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import UserReservationContent from "@/components/reservations/UserReservationContent";
import AdminReservationContent from "@/components/reservations/AdminReservationContent";

const ReservationPage = () => {
  const { userData } = useAuth();
  
  return (
    <div className="h-screen">
      <Header />
      <div className="px-40 py-10 bg-zinc-200">
        <h1 className="text-xl font-medium font-accent">Reservations</h1>
      </div>
      {/* user content */}
      {userData?.role === "1" && (<UserReservationContent />)}

      {userData?.role === "0" && <AdminReservationContent />}
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ReservationPage;
