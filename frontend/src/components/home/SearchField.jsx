import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchSchema } from "../schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/axios";

const SearchField = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      capacity: "",
      bedType: "",
      category: "",
      rate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = {
        category: data.category || "",
        capacity: data.capacity || "",
        bedType: data.bedType || "",
        rate: data.rate || ""
      }

      const response = await apiClient.post(`/rooms`, formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const searchData = response.data.data;
        console.log(searchData);
        // Navigate to search page with data
        navigate("/search", {
          state: { searchData },
        });
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  return (
    <div className="border bg-white  p-8 rounded-sm shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="px-5 py-6 w-[300px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Airconditioned</SelectItem>
                    <SelectItem value="1">Non-airconditioned</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Capacity</FormLabel>
                <FormControl>
                  <Input
                    className="px-5 py-6"
                    placeholder="Capacity"
                    type="number"
                    min="0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Bed Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="px-5 py-6  w-[200px]">
                      <SelectValue placeholder="Select bed type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Single</SelectItem>
                    <SelectItem value="1">Double</SelectItem>
                    <SelectItem value="2">Queen</SelectItem>
                    <SelectItem value="3">King</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Rate</FormLabel>
                <FormControl>
                  <Input
                    className="px-5 py-6 w-[300px]"
                    placeholder="Rate"
                    type="number"
                    min="0.00"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Button className="py-6 w-[150px]" type="submit">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchField;
