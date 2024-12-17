import React from "react";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import hotel1 from "@/assets/Hotel1.jpg";
import hotel2 from "@/assets/Hotel2.jpg";
import hotel3 from "@/assets/Hotel3.jpg";
import Header from "@/components/nav/Header";

const HomePage = () => {
  const images = [
    hotel1,
    hotel2,
    hotel3,
  ];
  return (
    <>
      <Header />
      <ImagesSlider className="h-[40rem]" images={images}>
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
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-semibold text-xl md:text-6xl text-center py-4 text-white">
            Welcome to DOrSU Hotel <br /> Your Comfort, Our Priority
          </motion.p>
          {/* <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Join now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button> */}
          <div className="border bg-slate-300 p-10">
            <div></div>
          </div>
        </motion.div>
      </ImagesSlider>
    </>
  );
};

export default HomePage;
