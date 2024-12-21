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
  2: "Family",
};

const bedTypeMap = {
  0: "Single",
  1: "Double",
  2: "Queen",
  3: "King",
};

const RoomsCard = ({ data, onBooking }) => {
  const { userData } = useAuth();

  const specialOffers = data.specialOffers;

  return (
    <Card className="">
      <CardHeader className="p-0">
        <div className={`h-56 bg-slate-200`}></div>
      </CardHeader>
      <CardContent className="p-5">
        <CardTitle className="text-md">{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
        <div className="mt-5">
          <div className="flex gap-2">
            {specialOffers.length > 0 &&
              specialOffers.map((data) => {
                const ammenitiesMap = {
                  0: { name: `${data.description}`, color: "bg-amber-300" },
                  1: { name: "Free Wifi", color: "bg-amber-300" },
                  2: { name: "Free Breakfast", color: "bg-amber-300" },
                  3: { name: "Free Parking", color: "bg-amber-300" },
                  4: { name: "Welcome refreshments", color: "bg-amber-300" },
                  5: { name: "Early access", color: "bg-amber-300" },
                };

                const badgeCategory = ammenitiesMap[data.type] || {
                  name: "Unknown",
                  color: "bg-gray-500",
                };

                return badgeCategory.name ? (
                  <Badge
                    key={data._id} // Ensure you have a unique key
                    className={`hidden md:inline ${badgeCategory.color} text-white hover:${badgeCategory.color}`}
                  >
                    {badgeCategory.name}
                  </Badge>
                ) : null;
              })}
          </div>
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
            <p className={data.discount > 0 ? `hidden` : `col-span-4 font-medium`}>
              {data.rate}
            </p>
            <p className={data.discount > 0 ? `col-span-4 font-medium` : `hidden`}>
              {data.discount} <span className="line-through text-muted-foreground font-normal">{data.rate}</span>
            </p>
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
