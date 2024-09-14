import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected successfully", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //io.emit() is used to send events to all socket members
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on() is used for listening events and will use in both frontend and backend
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
