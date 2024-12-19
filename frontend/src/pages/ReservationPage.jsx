import Header from "@/components/nav/Header";
import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/nav/Footer";
import ReservationCard from "@/components/reservations/ReservationCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ReservationPage = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState("");
//   const [showCheckOut, setShowCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      paymentMethod: "",
      paymentAmount: "",
    },
  });

  const fetchBookings = async () => {
    try {
      const { data } = await apiClient.get(`/${userData.id}/booking`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setBookingData(data.data);
      } else {
        setBookingData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckOut = (id) => {
    navigate(`/reservations/checkout?id=${id}`)
    // setShowCheckOut(true);
    // setCurrentBooking(data);
  };

  const handleClick = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen">
      <Header />
      <div className="px-40 py-10 bg-zinc-200">
        <h1 className="text-xl font-medium font-accent">Reservations</h1>
      </div>

      {bookingData.length > 0 ? (
        <div className="px-40 py-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {bookingData.map((data, index) => (
            <ReservationCard
              key={index}
              data={data}
              onCheckOut={handleCheckOut}
              onClick={handleClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 h-4/5 bg-zinc-50 px-40 py-20">
          <p className="text-zinc-400">No reservations found.</p>
          <Button
            className="rounded-none px-8 py-6  "
            onClick={() => navigate("/")}
          >
            <span>Return to homepage</span>
          </Button>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ReservationPage;
