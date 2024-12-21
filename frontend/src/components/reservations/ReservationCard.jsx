import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedSingle, PhilippinePeso, Settings2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const ReservationCard = ({ data, onPay, onCheckOut, onClick }) => {
  const statusMap = {
    0: { name: "Pending", color: "bg-zinc-500" },
    1: { name: "Confirmed", color: "bg-green-600" },
    2: { name: "Cancelled", color: "bg-yellow-600" },
    3: { name: "Checkout", color: "bg-red-600" },
    4: { name: "Payed", color: "bg-blue-600" },
  };

  const badgeCategory = statusMap[data.status] || {
    name: "Unknown",
    color: "bg-gray-500",
  };

  const handlePayment = (e) => {
    e.stopPropagation(); // Stop the onClick event from propagating
    onPay(data.id)
  }

  const handleCheckOutClick = (e) =>{
    e.stopPropagation(); 
    onCheckOut(data.id);
  }
  console.log(data)
  return (
    <Card className="" onClick={() => onClick(data.id)}>
      <CardHeader className="p-0">
        <div className={`h-40 bg-slate-200`}></div>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription>{data.description}</CardDescription>
        <div className="mt-5 flex justify-end">
          {badgeCategory.name && (
            <Badge
              className={`hidden font-normal md:inline ${badgeCategory.color} text-xs text-white hover:${badgeCategory.color}`}
            >
              {badgeCategory.name}
            </Badge>
          )}
        </div>
        <div className="mt-2 text-xs">
          <div className="flex justify-between">
            <div className="flex-shrink">
              <Settings2 className="my-auto inline" size={15} /> Category
            </div>
            <p className=" font-medium ">{categoryMap[data.category]}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink">
              <BedSingle className="my-auto inline" size={15} /> Bed Type
            </div>
            <p className=" font-medium ">{bedTypeMap[data.bedType]}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink">
              <Users className="my-auto inline" size={15} /> Capacity
            </div>
            <p className=" font-medium ">{`${data.capacity} persons`}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink">
              <PhilippinePeso className="my-auto inline" size={15} /> Rate
            </div>
            <p className=" font-medium ">{data.rate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-4 px-4 flex gap-2">
        <Button size="sm" className={data.status == 4 || data.status == 0 ? `hidden` :"text-xs"} onClick={handlePayment}>
          Go to payment
        </Button>
        <Button size="sm" className={data.status == 4 ? `text-xs` :"hidden"} onClick={handleCheckOutClick}>
          Checkout
        </Button>
        <Button size="sm" className={data.status == 4  ? `hidden` :"text-xs border-zinc-300"} variant="outline" onClick={handleCheckOutClick}>
          Cancel Reservation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
