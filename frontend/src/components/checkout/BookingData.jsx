import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatSimpleDate } from "@/util/helpers";
import {
  BedSingle,
  PhilippinePeso,
  Settings2,
  Users,
  AlarmClockMinus,
  AlarmClockPlus,
  Baby,
  LoaderCircle,
  User,
} from "lucide-react";

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

const BookingData = ({ data }) => {
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
  const adults = data.numberOfGuests ? data.numberOfGuests.adult : "0";
  const children = data.numberOfGuests ? data.numberOfGuests.children : "0";
  return (
    <div className="p-5 ">
      <h1 className="text-muted-foreground border-b mb-5">
        {data.description}
      </h1>
      <div className="mt-5 flex justify-end">
        {badgeCategory.name && (
          <Badge
            className={`hidden font-normal md:inline ${badgeCategory.color} text-xs text-white hover:${badgeCategory.color}`}
          >
            {badgeCategory.name}
          </Badge>
        )}
      </div>
      <div className="mt-2 text-md space-y-3">
        <div className="flex justify-between">
          <div className="flex-shrink">
            <Settings2 className="my-auto inline" size={15} /> Category
          </div>
          <p className=" font-medium text-sm">{categoryMap[data.category]}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <BedSingle className="my-auto inline" size={15} /> Bed Type
          </div>
          <p className=" font-medium text-sm">{bedTypeMap[data.bedType]}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <Users className="my-auto inline" size={15} /> Capacity
          </div>
          <p className=" font-medium text-sm">{`${data.capacity} persons`}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <PhilippinePeso className="my-auto inline" size={15} /> Rate
          </div>
          <p className=" font-medium text-sm">{data.rate}</p>
        </div>
        <div className="w-full border-b"></div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <AlarmClockPlus className="my-auto inline" size={15} /> Check In
          </div>
          <p className=" font-medium text-sm">
            {formatSimpleDate(data.checkIn)}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <AlarmClockMinus className="my-auto inline" size={15} /> Check Out
          </div>
          <p className=" font-medium text-sm">
            {formatSimpleDate(data.checkOut)}
          </p>
        </div>
        <div className="w-full">Guests:</div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <User className="my-auto inline" size={15} /> Adults
          </div>
          <p className=" font-medium text-sm">{adults}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex-shrink">
            <Baby className="my-auto inline" size={15} /> Children
          </div>
          <p className=" font-medium text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingData;
