const express = require("express");
const app = express();
const cors = require("cors");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(cors()); //allowing all sources

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

let connections = [];
let currentRoomId = "";

io.on("connection", (socket) => {
  connections.push(socket); //store the connections in an array

  const socketId = socket.id;
  console.log(`${socketId} has connected.`);

  socket.on("userJoinedRoom", (data) => {
    const { name, roomId, userId, host, presenter } = data;

    currentRoomId = roomId;
    const users = addUser({ socketId, ...data }); // an array of users in the room

    socket.join(roomId); // user joined the room

    console.log(`${userId} joined room ${roomId}`);

    io.sockets.in(roomId).emit("userIsJoined", { users: users });

    socket
      .to(roomId)
      .emit("userJoinedRoom", { success: true, user: { socketId, ...data } });
  });

  //Pencil
  socket.on("drawPencil", ({ path, strokeColor, roomId }) => {
    // console.log("drawing pencil...");
    socket
      .to(roomId)
      .emit("onDrawPencil", { path: path, strokeColor: strokeColor });
  });

  //Line
  socket.on("drawLine", ({ path, strokeColor, roomId }) => {
    // console.log("drawing line...");
    socket.to(roomId).emit("onDrawLine", {
      x1: path[0],
      y1: path[1],
      x2: path[2],
      y2: path[3],
      strokeColor: strokeColor,
    });
  });

  //Rectrangle
  socket.on("drawRect", ({ path, strokeColor, roomId }) => {
    // console.log("drawing rect...");
    socket.to(roomId).emit("onDrawRect", {
      x1: path[0],
      y1: path[1],
      x2: path[2],
      y2: path[3],
      strokeColor: strokeColor,
    });
  });

  //Eraser
  socket.on("erase", ({ path, roomId }) => {
    // console.log("Eraser");
    socket.to(roomId).emit("onErase", {
      x1: path[0],
      y1: path[1],
      x2: path[2],
      y2: path[3],
    });
  });

  //handle chat message
  socket.on("message", ({ message, roomId }) => {
    const user = getUser(socketId);
    if (user) {
      socket.to(roomId).emit("onMessage", { message, name: user.name });
    }
  });

  //when user leaves
  socket.on("disconnect", () => {
    console.log(`${socketId} is disconnected`);
    const user = getUser(socketId);
    if (user) {
      socket
        .to(currentRoomId)
        .emit("onDisconnect", { name: user.name, socketId: user.socketId }); // io.sockets.to().emit() is a bug here
      removeUser(socketId);
    }

    // remove connection from array
    connections = connections.filter((con) => con.id !== socket.id);
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    msg: "Server error: " + err.message,
  });
});

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
