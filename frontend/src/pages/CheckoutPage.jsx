import React, { useState, useEffect } from "react";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState("");
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get("id");

  

  const fetchBooking = async () => {
    try {
      const { data } = await apiClient.get(`/booking/${bookingId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setBookingData(data.data);
      } else {
        setBookingData("");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="px-40 py-10 bg-zinc-200">
        <h1 className="text-xl font-medium font-accent">Checkout</h1>
      </div>
      <div className="h-4/5   px-40 py-20 flex justify-center items-start">
        <CheckoutForm data={bookingData}/>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default CheckoutPage;
