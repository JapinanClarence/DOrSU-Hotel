import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Email or Username is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const SignupSchema = z
  .object({
    firstname: z.string().min(1, {
      message: "Firstname is required",
    }),
    lastname: z.string().min(1, {
      message: "Lastname is required",
    }),
    middlename: z.string().optional(),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const SearchSchema = z.object({
  category: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(["0", "1"]).optional()
  ),
  capacity: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().optional()
  ),
  bedType: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(["0", "1", "2", "3"]).optional()
  ),
  rate: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().optional()
  ),
});

export const BookingSchema = z.object({
  checkIn: z.string().min(1, "Check in is required"),
  checkOut: z.string().min(1, "Check out is required"),
  adult: z.preprocess(
    (val) => Number(val),
    z.number().min(1, {
      message: "No of adults is required",
    })
  ),
  children: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().optional()
  ),
});
