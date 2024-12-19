import React from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import hotel1 from "@/assets/Hotel1.jpg";
import hotel2 from "@/assets/Hotel2.jpg";
import hotel3 from "@/assets/Hotel3.jpg";
import Header from "@/components/nav/Header";
import SearchField from "@/components/home/SearchField";
import { Button } from "@/components/ui/button";
import HomeCarousel from "@/components/home/HomeCarousel";
import AmenitiesCard from "@/components/home/AmenitiesCard";
import { HandPlatter, Heater, Router, Vault } from "lucide-react";
import rainbowvortex from "@/assets/rainbowvortex.svg";
import reactSvg from "@/assets/react.svg";
import Footer from "@/components/nav/Footer";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { userData } = useAuth();

  const images = [hotel1, hotel2, hotel3];
  return (
    <div>
      <Header />
      {/* Admin Content */}
      {userData?.role === "0" ? (
        <>
          <div className="px-40 py-10 h-4/5 bg-gray-300">
            <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>
            {/* <p className="text-center text-lg">
              Manage hotel settings, bookings, and more!
            </p> */}
            {/* <div className="flex justify-center mt-10">
              <Button className="mr-4">Manage Bookings</Button>
              <Button className="mr-4">View Reports</Button>
              <Button>Admin Settings</Button>
            </div> */}
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[40rem]">
            <ImagesSlider className="h-full" images={images}>
              <motion.div
                initial={{
                  opacity: 0,
                  y: -80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center relative"
              >
                <motion.p className=" text-xl md:text-6xl text-center py-4 text-white font-accent">
                  Welcome to DOrSU Hotel <br /> Your Comfort, Our Priority
                </motion.p>
                <Button
                  className="bg-white text-slate-900 mt-4 rounded-none px-8 py-6 hover:text-white "
                  onClick={() => {
                    document.getElementById("searchfield").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <span>Get Started</span>
                </Button>
              </motion.div>
            </ImagesSlider>
            <div
              id="searchfield"
              className="absolute -bottom-20 w-full flex justify-center pt-20"
            >
              <SearchField />
            </div>
          </div>
          <div className="px-40 py-10 mt-32 w-full">
            <HomeCarousel />
            <div className="flex justify-center mt-10">
              <Button>See More</Button>
            </div>
          </div>

          <div
            className="px-40 py-20 mt-20 w-full"
            style={{
              backgroundColor: "#FFFFFF",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23FFFFFF' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23FFFFFF' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
              //   backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mb-10 space-y-10">
              <h1 className="font-accent text-2xl text-center font-medium ">
                DOrSU Hotel Amenities
              </h1>
              <p className="text-center text-xl mx-60 font-light">
                Welcome to DOrSU Hotel, where comfort and convenience come
                together. Enjoy a relaxing stay with amenities tailored to meet
                your needs!
              </p>
            </div>

            <div className="flex gap-20 justify-center">
              <AmenitiesCard title={"Fast Wifi"} icon={Router} />
              <AmenitiesCard title={"Quality Service"} icon={HandPlatter} />
              <AmenitiesCard title={"Safe"} icon={Vault} />
              <AmenitiesCard title={"Comfortable"} icon={Heater} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
