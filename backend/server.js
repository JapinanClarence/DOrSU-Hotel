import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import auth from "./router/auth.js";
import rooms from "./router/rooms.js";

const app = express();

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log("Local DB connected successfully");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use(cors());


app.use("/api/", auth);
app.use("/api/", rooms);

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
