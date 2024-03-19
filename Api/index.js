import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./Routes/user.route.js";
import AuthRouter from "./Routes/Auth.route.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`MongoDB connected successfully...`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", AuthRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const errMessage = err.message || `Internal server Error`;
  res.status(statuscode).json({
    success: false,
    statuscode,
    errMessage,
  });
});
