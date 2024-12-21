import React from "react";
import { BedSingle, PhilippinePeso, Settings2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
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

const RoomsCard = ({ data, onBooking }) => {
  const { userData } = useAuth();
  const availabilityMap = {
    0: { name: "Unavailable", color: "bg-red-500" },
    1: { name: "Available", color: "bg-green-600" },
  };

  const badgeCategory = availabilityMap[data.availability] || {
    name: "Unknown",
    color: "bg-gray-500",
  };

  return (
    <Card className="">
      <CardHeader className="p-0">
        <div className={`h-56 bg-slate-200`}></div>
      </CardHeader>
      <CardContent className="p-5">
        <CardDescription>{data.description}</CardDescription>
        <div className="mt-5">
          {/* {badgeCategory.name && (
            <Badge
              className={` hidden md:inline ${badgeCategory.color} text-white hover:${badgeCategory.color}`}
            >
              {badgeCategory.name}
            </Badge>
          )} */}
          <div className="flex justify-between">
            <div className="flex-shrink text-sm">
              <Settings2 className="my-auto inline" size={18} /> Category
            </div>
            <p className="col-span-4 font-medium">
              {categoryMap[data.category]}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink text-sm">
              <BedSingle className="my-auto inline" size={18} /> Bed Type
            </div>
            <p className="col-span-4 font-medium">{bedTypeMap[data.bedType]}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink text-sm">
              <Users className="my-auto inline" size={18} /> Capacity
            </div>
            <p className="col-span-4 font-medium">{`${data.capacity} persons`}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex-shrink text-sm">
              <PhilippinePeso className="my-auto inline" size={18} /> Rate
            </div>
            <p className="col-span-4 font-medium">{data.rate}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-5 px-5">
        <Button
          className={userData?.role == 0 && `hidden`}
          onClick={() => onBooking(data)}
        >
          Book now
        </Button>
        <Button
          className={userData?.role != 0 && `hidden`}
          onClick={() => onBooking(data)}
        >
          Edit Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomsCard;
