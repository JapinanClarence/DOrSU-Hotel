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

const categoryMap = {
  0: "Non-airconditioned",
  1:"Airconditioned"
}

const bedTypeMap = {
  0: "Single",
  1:"Double",
  2:"Queen",
  3: "King"
}

const HomeCarousel = () => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () =>{
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
  }

   useEffect(() =>{
    fetchRooms();
   }, [])
  
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {roomData.map((data, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="">
                <CardHeader className="p-0">
                  <div className={` h-56 bg-slate-200`}></div>
                </CardHeader>
                <CardContent className="p-5">
                  <CardDescription>
                    {data.description}
                  </CardDescription>
                  <div className="mt-5">
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
                        <BedSingle className="my-auto inline" size={18} /> Bed
                        Type
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
                        <PhilippinePeso className="my-auto inline" size={18} />{" "}
                        Rate
                      </div>
                      <p className="col-span-4 font-medium">{data.rate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-5 px-5">
                  <Button>
                    Book now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeCarousel;
