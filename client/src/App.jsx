/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import { RoomPage } from "./pages/RoomPage";
import io from 'socket.io-client'

import Form from "./components/Forms";
import { useState, useEffect } from "react";

const server = "http://localhost:3000";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() =>{
    console.log("hey");
    socket.on("userIsJoined", (data) => {
      if(data.success){
        console.log("UserJoined");
      }else{
        console.log("error joining user");
      }
    })
  }, [])

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Form socket={socket} setUser={setUser}/>}/>
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket}/>}/>
      </Routes>
    </div>
  )
}
export default App;