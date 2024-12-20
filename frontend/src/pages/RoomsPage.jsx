import React, { useState, useEffect } from "react";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingDialog from "@/components/booking/BookingDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from "@/components/schema";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import RoomsCard from "@/components/rooms/RoomsCard";
import { Button } from "@/components/ui/button";

const RoomsPage = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [bookingDialog, showBookingDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const date = formatDate(Date.now());

  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      adult: "",
      children: "",
    },
  });

  const fetchRooms = async () => {
    try {
      const { data } = await apiClient.get("/rooms");

      if (data.success) {
        setRoomData(data.data);
      } else {
        setRoomData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBooking = (data) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setCurrentRoom(data);
      showBookingDialog(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guestCount: {
          adult: data.adult,
          children: data.children || null,
        },
        room: currentRoom._id,
      };
      console.log(formData);
      setIsSubmitting(true);
      const res = await apiClient.post("/booking", formData, {
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        setIsSubmitting(false);
        showBookingDialog(false);
        form.reset();

        toast({
          title: "Room reservation has been created",
          description: `${date}`,
        });
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="h-screen">
      <Header />
      <div className="px-40 py-10 bg-zinc-200">
        <h1 className="text-xl font-medium font-accent">Reservations</h1>
      </div>
      {roomData.length > 0 ? (
        <div className="px-40 py-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {roomData.map((data, index) => (
            <RoomsCard
              key={index}
              data={data}
              onBooking={handleBooking}
              //   onPay={handleNavigatetoPayment}
              //   onClick={handleClick}
              //   onCheckOut={handleCheckOut}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 h-4/5 bg-zinc-50 px-40 py-20">
          <p className="text-zinc-400">No rooms found.</p>
          <Button
            className="rounded-none px-8 py-6  "
            onClick={() => navigate("/")}
          >
            <span>Return to homepage</span>
          </Button>
        </div>
      )}

      <Footer />
      <BookingDialog
        open={bookingDialog}
        onOpenChange={showBookingDialog}
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        data={currentRoom}
      />
    </div>
  );
};

export default RoomsPage;
