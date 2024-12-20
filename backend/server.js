import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import auth from "./router/auth.js";
import rooms from "./router/rooms.js";
import booking from "./router/booking.js";
import transactions from "./router/transaction.js";

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
const app = express();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "development") {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => {
      console.log("Local DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
} else if (NODE_ENV === "production") {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
}


app.use(cors());


app.use("/api/", auth);
app.use("/api/", rooms);
app.use("/api/", booking);
app.use("/api/", transactions);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
