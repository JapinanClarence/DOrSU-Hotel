import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CardDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Card Information</DialogTitle>
          <DialogDescription>
            Your credit card information is protected
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Card number</Label>
            <Input type="text" placeholder="Enter your card number" />
          </div>
          <div>
            <Label>Name on Card</Label>
            <Input type="text" placeholder="Enter name" />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
