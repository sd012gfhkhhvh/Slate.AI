const express = require('express');
const app = express();

const server = require('http').createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
})

let connections = [];
let currentRoomId = '';
let currentPath = [];

io.on("connection", (socket) => {
    connections.push(socket); //store the connections in an array

    console.log(`${socket.id} has connected.`);

    socket.on("userJoinedRoom", (data) => {
        const { name, roomId, userId, host, presenter } = data;
        socket.join(roomId)
        currentRoomId = roomId;
        console.log(`${userId} joined room ${roomId}`);

        socket.emit("userIsJoined", { success: true });
        socket.to(roomId).emit("userJoinedRoom", { success: true });

        socket.to(roomId).emit("onDraw",{ path: currentPath });
    })

    socket.on("draw", ({path}) => {
        currentPath = path;
        console.log("drawing...");
        // console.log(path);
        // console.log(currentRoomId);
        socket.to(currentRoomId).emit("onDraw", {path: path});
    })


    //when user leves
    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} is disconnected`);
        //remove connection from array
        connections = connections.filter((con) => con.id !== socket.id)
    })
})

// io.of("/currentRoomId").on("connection", (socket) => {
//     socket.on("draw", (path) => {
//         currentPath = path;
//         console.log("drawing...");

//         io.of("/currentRoomId").to(currentRoomId).emit("onDraw", {path: path});
//     })
// })

server.listen(port, () => {
    console.log(`server listening on ${port}`);
})