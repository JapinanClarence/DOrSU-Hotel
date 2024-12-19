import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReservationCard from "@/components/reservations/ReservationCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/util/helpers";

const UserReservationContent = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState("");
    const [showCheckOut, setShowCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
 const date = formatDate(Date.now());
  //   const form = useForm({
  //     resolver: zodResolver(),
  //     defaultValues: {
  //       paymentMethod: "",
  //       paymentAmount: "",
  //     },
  //   });

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

  const handleNavigatetoPayment = (id) => {
    navigate(`/reservations/checkout?id=${id}`);
    // setShowCheckOut(true);
    // setCurrentBooking(data);
  };
  const handleCheckOut = (id) => {
    setShowCheckOut(true);
    setCurrentBooking(id);
  };

  const onCheckOut = async() =>{
    try {

        const res = await apiClient.patch(
          `/booking/${currentBooking}/status`,
          { status: "3" },
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        if (res) {
       
  
          toast({
            title: `Reservation status has been updated`,
            description: `${date}`,
          });
          await fetchBookings();
        }
      } catch (error) {
        const message = error;
        console.log(message);
      }
  }

  const handleClick = (data) => {
    console.log(data);
  };
  return (
    <>
      {bookingData.length > 0 ? (
        <div className="px-40 py-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {bookingData.map((data, index) => (
            <ReservationCard
              key={index}
              data={data}
              onPay={handleNavigatetoPayment}
              onClick={handleClick}
              onCheckOut={handleCheckOut}
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
      <AlertDialog open={showCheckOut} onOpenChange={setShowCheckOut}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Booking transaction will be cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onCheckOut}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserReservationContent;
