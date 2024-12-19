import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSchema } from "@/components/schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/api/axios";
import BookingData from "./BookingData";
import GCashDialog from "./GCashDialog";
import CardDialog from "./CardDialog";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ data }) => {
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showGcashDialog, setShowGcashDialog] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get("id");
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      paymentMethod: "",
      paymentAmount: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await apiClient.patch(
        `/booking/${bookingId}/payment`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response) {
        console.log(response)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const setPaymentMethod = (value) => {
    if (value == 1) {
      setShowGcashDialog(true);
    } else if (value == 2) {
      setShowCardDialog(true);
    }
  };

  return (
    <div className="flex justify-between ">
      <BookingData data={data} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[500px] p-5 rounded-lg"
          style={{
            backgroundColor: "#FFFFFF",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23FFFFFF' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23FFFFFF' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
            //   backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {errorMessage && (
            <Alert
              variant="destructive"
              className="py-2 px-3 bg-red-500 bg-opacity-20"
            >
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            {/* Check in Field */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Payment Method
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setPaymentMethod(value); // Update the dialog based on selection
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Cash</SelectItem>
                      <SelectItem value="1">GCash</SelectItem>
                      <SelectItem value="2">Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            {/* Check out Field */}
            <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-sm">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter amount"
                      min="0.00"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              size="sm"
              type="submit"
              className="w-[140px] text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <GCashDialog open={showGcashDialog} onOpenChange={setShowGcashDialog} />
      <CardDialog open={showCardDialog} onOpenChange={setShowCardDialog} />
    </div>
  );
};

export default CheckoutForm;
