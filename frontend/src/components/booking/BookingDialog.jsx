import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { BedSingle, PhilippinePeso, Settings2, Users } from "lucide-react";

const categoryMap = {
  0: "Non-airconditioned",
  1: "Airconditioned",
};

const bedTypeMap = {
  0: "Single",
  1: "Double",
  2: "Queen",
  3: "King",
};

const BookingDialog = ({
  open,
  onOpenChange,
  onSubmit,
  form,
  isSubmitting,
  errorMessage,
  data,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Room Reservation</DialogTitle>
          <DialogDescription>
            Fill out the necessary details to reserve your desired room. Ensure
            all information is accurate to confirm your booking successfully.
          </DialogDescription>
          <div className="flex justify-between">
            <div className="space-y-4">
              <h1 className="text-sm font-semibold">Room information</h1>
              <div className="flex flex-col justify-between">
                <div className="flex-shrink text-sm font-medium">Category</div>
                <p className="col-span-4 text-sm text-muted-foreground">
                  {categoryMap[data.category]}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex-shrink text-sm font-medium">Bed Type</div>
                <p className="col-span-4 text-sm text-muted-foreground">
                  {bedTypeMap[data.bedType]}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex-shrink text-sm font-medium">Capacity</div>
                <p className="col-span-4 text-sm text-muted-foreground">{`${data.capacity} persons`}</p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex-shrink text-sm font-medium">Rate</div>
                <p className="col-span-4 text-sm text-muted-foreground">{data.rate}</p>
              </div>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
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
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 text-sm">
                            Check In
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    {/* Check out Field */}
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 text-sm">
                            Check Out
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    {/* Adult Field */}
                    <FormField
                      control={form.control}
                      name="adult"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 text-sm">
                            Adults
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              placeholder="Number of adults"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    {/* Children Field */}
                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 text-sm">
                            Children
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              placeholder="Number of children"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-start gap-2 mt-4">
                    <Button
                      type="submit"
                      className="w-[180px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Create Reservation"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-gray-500 hover:bg-gray-100"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
