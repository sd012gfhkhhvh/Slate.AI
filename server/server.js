const express = require('express');
const app = express();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const server = require('http').createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
})

let connections = [];
let currentRoomId = '';

io.on("connection", (socket) => {
    connections.push(socket); //store the connections in an array

    const socketId = socket.id
    console.log(`${socketId} has connected.`);

    socket.on("userJoinedRoom", (data) => {
        const { name, roomId, userId, host, presenter } = data;

        currentRoomId = roomId;
        const users = addUser({ socketId, ...data }) // an array of users in the room

        socket.join(roomId) // user joined the room

        console.log(`${userId} joined room ${roomId}`);

        io.sockets.in(roomId).emit("userIsJoined", { users: users });

        socket.to(roomId).emit("userJoinedRoom", { success: true, users: users });
    })

    //Pencil
    socket.on("drawPencil", ({ path, strokeColor }) => {
        // console.log("drawing pencil...");
        // console.log(path);
        socket.to(currentRoomId).emit("onDrawPencil", { path: path, strokeColor: strokeColor });
    })

    //Line
    socket.on("drawLine", ({ path, strokeColor }) => {
        // console.log("drawing line...");
        socket.to(currentRoomId).emit("onDrawLine", { x1: path[0], y1: path[1], x2: path[2], y2: path[3], strokeColor: strokeColor });
    })

    //Rectrangle
    socket.on("drawRect", ({ path, strokeColor }) => {
        // console.log("drawing rect...");
        socket.to(currentRoomId).emit("onDrawRect", { x1: path[0], y1: path[1], x2: path[2], y2: path[3], strokeColor: strokeColor });
    })

    //handle chat message
    socket.on("message", ({ message }) => {
        const user = getUser(socketId)
        if (user) {
            socket.to(currentRoomId).emit("onMessage", { message, name: user.name});
        }
    })

    //when user leaves
    socket.on("disconnect", () => {
        console.log(`${socketId} is disconnected`);
        const user = getUser(socketId);
        if (user) {
            socket.to(currentRoomId).emit("onDisconnect", user.name) // io.sockets.to().emit() is a bug here
            removeUser(socketId);
        }

        // remove connection from array
        connections = connections.filter((con) => con.id !== socket.id)
    })
})

server.listen(port, () => {
    console.log(`server listening on ${port}`);
})