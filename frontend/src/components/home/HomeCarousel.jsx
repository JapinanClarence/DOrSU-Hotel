import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { BedSingle, PhilippinePeso, Settings2, Users } from "lucide-react";
import { Button } from "../ui/button";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingDialog from "../booking/BookingDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from "../schema";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/util/helpers";
import { Badge } from "../ui/badge";

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

const availabilityMap = {
  0: { name: "Unavailable", color: "bg-red-500" },
  1: { name: "Available", color: "bg-green-600" },
};
const HomeCarousel = () => {
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
        setRoomData(data.data.slice(0, 5));
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
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {roomData.map((data, index) => {
            const badgeDetails = availabilityMap[data.availability] || {};
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="">
                    <CardHeader className="p-0">
                      <div className={`h-56 bg-slate-200`}></div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <CardTitle className="text-md">{data.name}</CardTitle>
                      <CardDescription>{data.description}</CardDescription>
                      <div className="mt-5">
                        {/* {badgeDetails.name && (
                          <Badge
                            className={` hidden md:inline ${badgeDetails.color} text-white hover:${badgeDetails.color}`}
                          >
                            {badgeDetails.name}
                          </Badge>
                        )} */}
                        <div className="flex justify-between">
                          <div className="flex-shrink text-sm">
                            <Settings2 className="my-auto inline" size={18} />{" "}
                            Category
                          </div>
                          <p className="col-span-4 font-medium">
                            {categoryMap[data.category]}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex-shrink text-sm">
                            <BedSingle className="my-auto inline" size={18} />{" "}
                            Bed Type
                          </div>
                          <p className="col-span-4 font-medium">
                            {bedTypeMap[data.bedType]}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex-shrink text-sm">
                            <Users className="my-auto inline" size={18} />{" "}
                            Capacity
                          </div>
                          <p className="col-span-4 font-medium">{`${data.capacity} persons`}</p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex-shrink text-sm">
                            <PhilippinePeso
                              className="my-auto inline"
                              size={18}
                            />{" "}
                            Rate
                          </div>
                          <p className="col-span-4 font-medium">{data.rate}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-5 px-5">
                      <Button onClick={() => handleBooking(data)}>
                        Book now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <BookingDialog
        open={bookingDialog}
        onOpenChange={showBookingDialog}
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        data={currentRoom}
      />
    </>
  );
};


export default HomeCarousel;
