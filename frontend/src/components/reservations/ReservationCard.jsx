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
  0: "Non-airconditioned",
  1: "Airconditioned",
};

const bedTypeMap = {
  0: "Single",
  1: "Double",
  2: "Queen",
  3: "King",
};

const ReservationCard = ({ data, onCheckOut, onClick }) => {
  const statusMap = {
    0: { name: "Pending", color: "bg-zinc-500" },
    1: { name: "Confirmed", color: "bg-green-600" },
    2: { name: "Cancelled", color: "bg-yellow-600" },
    3: { name: "Checkout", color: "bg-red-600" },
  };

  const badgeCategory = statusMap[data.status] || {
    name: "Unknown",
    color: "bg-gray-500",
  };

  const handleCheckOutClick = (e) => {
    e.stopPropagation(); // Stop the onClick event from propagating
    onCheckOut(data.id)
  }
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
      <CardFooter className="pb-4 px-4">
        <Button size="sm" className="text-xs" onClick={handleCheckOutClick}>
          Check Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
