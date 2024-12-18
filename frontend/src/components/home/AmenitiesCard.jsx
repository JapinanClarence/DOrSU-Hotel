import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const AmenitiesCard = ({ title, icon: Icon }) => {
  return (
    <motion.div
      className="border shadow-lg border-slate-200 overflow-hidden rounded-xl aspect-square"
      whileHover={{ y: -5 }}
    >
      <div className="h-full  p-10 flex items-center justify-center flex-col text-lg  gap-5">
        <Icon size={90} strokeWidth={2} absoluteStrokeWidth className="mr-2" />
        {title}
      </div>
    </motion.div>
  );
};

export default AmenitiesCard;
