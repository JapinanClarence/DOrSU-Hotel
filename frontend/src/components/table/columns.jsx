// PaymentColumns.js
import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Ban, ChevronDown, CircleCheck, LogOut, Timer } from "lucide-react";
import { dateOnly } from "@/util/helpers";


// Define the columns for the table
export const columns = (onApprove) => [
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reservation = row.original;

      const fullname = `${reservation.firstname} ${
        reservation.middlename ? reservation.middlename[0] + ". " : ""
      }${reservation.lastname}`;

      return <div className="text-xs">{fullname}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "bedType",
    header: "Bed Type",
    cell: ({ row }) => <div className="text-xs">{row.getValue("bedType")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rate
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("rate")}</div>,
  },
  {
    accessorKey: "checkIn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check in
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reservation = row.original;
      const date = dateOnly(reservation.checkIn);
      return <div className="text-xs">{date}</div>;
    },
  },
  {
    accessorKey: "checkOut",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Checkout
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reservation = row.original;
      const date = dateOnly(reservation.checkOut);
      return <div className="text-xs">{date}</div>;
    },
  },
  {
    accessorKey: "numberOfGuests",
    header: ({ column }) => "Guest",
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 px-2 text-muted-foreground border border-zinc-300">
            {/* <span className="sr-only">Open menu</span> */}
            {`Adult: ${reservation.numberOfGuests?.adult}`} <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Guests</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Adult: {reservation.numberOfGuests?.adult}</DropdownMenuItem>
          <DropdownMenuItem>Children: {reservation.numberOfGuests?.children}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "paymentAmount",
    header: "Payment Amount",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("paymentAmount")}</div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="text-xs">{row.getValue("paymentMethod")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusMap = {
        0: {
          name: "Pending",
          color: "bg-red-500",
          icon: (
            <Timer size={18} strokeWidth={1.7} className="inline-block mr-1" />
          ),
        },
        1: {
          name: "Approved",
          color: "bg-green-600",
          icon: (
            <CircleCheck
              strokeWidth={2}
              size={15}
              className="inline-block mr-1"
            />
          ),
        },
        2: {
          name: "Cancelled",
          color: "bg-green-600",
          icon: <Ban strokeWidth={2} size={15} className="inline-block mr-1" />,
        },
        3: {
          name: "Checkout",
          color: "bg-green-600",
          icon: (
            <LogOut strokeWidth={2} size={15} className="inline-block mr-1" />
          ),
        },
        4:{
            name: "Payed",
            color: "bg-green-600",
            icon: (
              <BadgeCheck strokeWidth={2} size={15} className="inline-block mr-1" />
            ),
        }
      };

      const status = statusMap[row.getValue("status")];

      return (
        <span className={`text-xs flex items-center`}>
          {status?.icon}
          {status?.name}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;

      const handleCopy = (event) => {
        event.stopPropagation(); // Prevent the row click event
        navigator.clipboard.writeText(reservation.id);
      };

      const handleApprove = (event) => {
        event.stopPropagation(); // Prevent the row click event
        onApprove(reservation);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-5 w-5 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem onClick={handleCopy}>
              Copy Reservation ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className={reservation.status != 0 && `hidden`} onClick={handleApprove}>Approve</DropdownMenuItem>
            <DropdownMenuItem className={reservation.status != 4 && `hidden`} onClick={()=> console.log("checkout")}>Checkout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
