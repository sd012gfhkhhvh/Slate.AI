const express = require('express');
const app = express();
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

const server = require('http').createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
})

let connections = [];
let currentRoomId = '';

const isRoomPresent = (roomId) => {
    return rooms.find(room => roomId === room)
}

io.on("connection", (socket) => {
    connections.push(socket); //store the connections in an array

    console.log(`${socket.id} has connected.`);

    socket.on("userJoinedRoom", (data) => {
        const { name, roomId, userId, host, presenter } = data;
        currentRoomId = roomId;
        const users = addUser({ name, roomId, userId, host, presenter }) // an array of users in the room

        socket.join(roomId) // user joined the room

        console.log(`${userId} joined room ${roomId}`);

        io.sockets.in(roomId).emit("userIsJoined", { users: users });

        socket.to(roomId).emit("userJoinedRoom", { success: true, users: users  });
    })

    //Pencil
    socket.on("drawPencil", ({ path }) => {
        console.log("drawing pencil...");
        // console.log(path);
        socket.to(currentRoomId).emit("onDrawPencil", { path: path });
    })

    //Line
    socket.on("drawLine", ({ path }) => {
        console.log("drawing line...");
        socket.to(currentRoomId).emit("onDrawLine", { x1: path[0], y1: path[1], x2: path[2], y2: path[3] });
    })

    //Rectrangle
    socket.on("drawRect", ({ path }) => {
        console.log("drawing rect...");
        socket.to(currentRoomId).emit("onDrawRect", { x1: path[0], y1: path[1], x2: path[2], y2: path[3] });
    })

    //when user leves
    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} is disconnected`);
        //remove connection from array
        connections = connections.filter((con) => con.id !== socket.id)
    })
})

server.listen(port, () => {
    console.log(`server listening on ${port}`);
})