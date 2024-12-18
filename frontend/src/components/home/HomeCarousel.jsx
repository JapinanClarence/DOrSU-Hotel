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
import React from "react";
import { BedSingle, PhilippinePeso, Settings2, Users } from "lucide-react";
import { Button } from "../ui/button";

const HomeCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="">
                <CardHeader className="p-0">
                  <div className={` h-56 bg-slate-200`}></div>
                </CardHeader>
                <CardContent className="p-5">
                  <CardDescription>
                    Spacious air-conditioned room with modern amenities.
                  </CardDescription>
                  <div className="mt-5">
                    <div className="flex justify-between">
                      <div className="flex-shrink text-sm">
                        <Settings2 className="my-auto inline" size={18} />{" "}
                        Category
                      </div>
                      <p className="col-span-4 font-medium">
                        {"Airconditioned"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex-shrink text-sm">
                        <BedSingle className="my-auto inline" size={18} /> Bed
                        Type
                      </div>
                      <p className="col-span-4 font-medium">{"Double"}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex-shrink text-sm">
                        <Users className="my-auto inline" size={18} /> Capacity
                      </div>
                      <p className="col-span-4 font-medium">{"5 persons"}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex-shrink text-sm">
                        <PhilippinePeso className="my-auto inline" size={18} />{" "}
                        Rate
                      </div>
                      <p className="col-span-4 font-medium">{"$500"}</p>
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
