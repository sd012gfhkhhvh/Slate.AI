import io from 'socket.io-client'

const server = "http://localhost:3000";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

export const socket = io(server, connectionOptions);