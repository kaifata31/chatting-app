import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectMongodb } from "./database/connectToMongo.js";
import { app,server } from "./socket/socket.js";



dotenv.config();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hi Iam working");
});

server.listen(port, () => {
  connectMongodb();
  console.log(`Server is running on port ${port}`);
});
