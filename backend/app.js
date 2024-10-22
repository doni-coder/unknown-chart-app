import express from "express";
import http from "http";
import { Server } from "socket.io";
// import { router as userRouter } from "./routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use("/api", userRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    if (userSocketMap[userId]) {
      console.log("chartId already taken");
      socket.emit("exist_user", {
        message: "chartId already taken",
        notify: true,
        userId: userId,
        shouldNavigate: false,
      });
      socket.disconnect();
    } else {
      userSocketMap[userId] = socket.id;
      socket.emit("user_joined", {
        message: "you joined",
        notify: true,
        shouldNavigate: true,
      });
      console.log(`Mapped user ${userId} to socket ${socket.id}`);
      console.log("connected user:", userSocketMap);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  }

  socket.on("send_message", async ({ recipientId, message }) => {
    const recipientSocketId = getReceiverSocketId(recipientId);
    if (userId == recipientId) {
      console.log("cannot sent message to own id");
    } else {
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", {
          senderId: userId,
          message: message,
          receiverId: recipientId,
        });
      } else {
        console.log("Recipient not found or not online");
      }
    }
  });

  socket.on("typing", async ({ recipientId, typing }) => {
    const recipientSocketId = getReceiverSocketId(recipientId);

    if (recipientSocketId) {
      if (typing) {
        io.to(recipientSocketId).emit("typing_msg", {
          senderId: userId,
          typing: true,
          recipientId: recipientId,
        });
      } else {
        io.to(recipientSocketId).emit("typing_msg", {
          senderId: userId,
          typing: false,
          recipientId: recipientId,
        });
      }
    } else {
      console.log("Recipient not found or not online");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, getReceiverSocketId };
