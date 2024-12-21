import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "../table/DataTable";
import { formatDate } from "@/util/helpers";

const categoryMap = {
  0: "Standard",
  1: "Suite",
  2: "Family"
};
const bedTypeMap = {
    0: "Single",
    1: "Double",
    2: "Queen",
    3: "King",
  };
  const paymentMethodMap = {
    0: "Cash",
    1: "GCash",
    2: "Card",
  };
const AdminReservationContent = () => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState("");
  //   const [showCheckOut, setShowCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const date = formatDate(Date.now());

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      paymentMethod: "",
      paymentAmount: "",
    },
  });

  const fetchBookings = async () => {
    try {
      const { data } = await apiClient.get(`/booking`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {

        const tableData = data.data.map((data)=>{
           return {
                id: data.id,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                rate: data.rate,
                category: categoryMap[data.category],
                bedType: bedTypeMap[data.bedType],
                firstname: data.firstname,
                lastname: data.lastname,
                middlename: data.middlename,
                email: data.email,
                status: data.status,
                capacity: data.capacity,
                adult: data.numberOfGuests?.adult,
                children: data.numberOfGuests?.children,
                numberOfGuests: data.numberOfGuests,
                paymentAmount: data.paymentAmount,
                paymentMethod: paymentMethodMap[data.paymentMethod],
            }
        })

        setBookingData(tableData);
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

  const handleOnApprove = async (data) => {
    try {

      const res = await apiClient.patch(
        `/booking/${data.id}`,
        { status: "1" },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res) {
        await fetchBookings();

        toast({
          title: `Reservation has been approved`,
          description: `${date}`,
        });
      }
    } catch (error) {
      const message = error;
      console.log(message);
    }
  };
  return (
    <div className="px-10 lg:px-40 py-20">
        <div className="border border-zinc-300 shadow-lg p-5 rounded-lg">
             <DataTable data={bookingData} onApprove={handleOnApprove} loading={loading}/>
        </div>
     
    </div>
  );
};

export default AdminReservationContent;
