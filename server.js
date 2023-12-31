import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
//* end of importing routes
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({
    origin: "https://webocean.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/hello", (req, res) => {
  res.send({ name: "Emma", age: 23 });
});

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});
app.listen(process.env.PORT, async () => {
  await connect();
  console.log("Backend server is running!");
});
