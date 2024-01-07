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

    //Pencil
    socket.on("drawPencil", ({path}) => {
        currentPath = path;
        console.log("drawing pencil...");
        // console.log(path);
        socket.to(currentRoomId).emit("onDrawPencil", {path: path});
    })

    //Line
    socket.on("drawLine", ({path}) => {
        currentPath = path;
        console.log("drawing line...");
        socket.to(currentRoomId).emit("onDrawLine", {x1: path[0], y1: path[1], x2:path[2], y2: path[3]});
    })

    //Rectrangle
    socket.on("drawRect", ({path}) => {
        currentPath = path;
        console.log("drawing rect...");
        socket.to(currentRoomId).emit("onDrawRect", {x1: path[0], y1: path[1], x2:path[2], y2: path[3]});
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