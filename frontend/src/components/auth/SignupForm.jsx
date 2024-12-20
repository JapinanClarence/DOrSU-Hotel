import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/DOrSU Hotel logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../schema";
import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeOff, Eye } from "lucide-react";
import apiClient from "@/api/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignupForm({ className, ...props }) {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const tooglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  const toogleConfirmPasswordVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  //handle form submit
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = SignupSchema.parse(data);

      const response = await apiClient.post("/register", formData);
      if (response) {
        navigate("/login");
      }
    } catch (error) {

      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card className="overflow-hidden">
        <CardHeader>
            <CardTitle className="text-xl">
                Welcome to DOrSU Hotel
            </CardTitle>
            <CardDescription>
                Fill in the form to get started.
            </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              {errorMessage && (
                <Alert
                  variant="destructive"
                  className="py-2 px-3 bg-red-500 bg-opacity-20"
                >
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <div>
                <div className="grid grid-flow-col grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">
                          Firstname
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-xs " />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">
                          Lastname
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-xs " />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Middlename{" "}
                        <span className="text-xs text-muted-foreground">{`(Optional)`}</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage className="text-xs " />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" autoComplete="email" />
                      </FormControl>
                      <FormMessage className="text-xs " />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <Input
                            {...field}
                            type={showPass ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                            onClick={tooglePasswordVisibility}
                            aria-label={
                              showPass ? "Hide Password" : "Show Password"
                            }
                          >
                            {showPass ? (
                              <Eye className="text-gray-500 size-4" />
                            ) : (
                              <EyeOff className="text-gray-500 size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full ">
                          <Input
                            {...field}
                            type={showConfirmPass ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full w-min px-3 py-2 hover:bg-transparent"
                            onClick={toogleConfirmPasswordVisibility}
                            aria-label={
                              showConfirmPass
                                ? "Hide Password"
                                : "Show Password"
                            }
                          >
                            {showConfirmPass ? (
                              <Eye className="text-gray-500 size-4" />
                            ) : (
                              <EyeOff className="text-gray-500 size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-5 mt-10">
                <Button
                  id="submit"
                  size="default"
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-md w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="w-6 h-6 text-gray-500 mx-auto animate-spin" />
                  ) : (
                    "Signup"
                  )}
                </Button>
                <div className="relative flex items-center">
                  <div className="flex-grow border-b"></div>
                  <span className="text-center px-4 text-muted-foreground">
                    or
                  </span>
                  <div className="flex-grow border-b"></div>
                </div>
                <Button
                  id="button"
                  variant="outline"
                  size="default"
                  className="rounded-md w-full "
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
