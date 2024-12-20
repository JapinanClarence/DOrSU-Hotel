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
import { formatDate } from "@/util/helpers";

const TransactionCard = ({ data, onClick }) => {
  return (
    <Card
      className="border border-zinc-300 shadow-sm"
      onClick={() => onClick(data.id)}
    >
      <CardHeader className="bg-slate-200 p-0 pb-3"></CardHeader>
      <CardContent className="mt-4">
        <CardTitle className="text-sm  font-semibold w-full inline-flex flex-col md:flex-row justify-between">
          {data.title} <p className="text-xs text-muted-foreground">{formatDate(data.timestamp)}</p>
        </CardTitle>
        <CardDescription>{data.message}</CardDescription>

      </CardContent>
    </Card>
  );
};

export default TransactionCard;
