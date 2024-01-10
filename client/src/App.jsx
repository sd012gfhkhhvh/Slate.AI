/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { RoomPage } from "./pages/RoomPage";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Forms";
import { useState, useEffect } from "react";

import { socket } from "./socket";

const App = () => {
  const [user, setUser] = useState({});

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
    <>
      <ToastContainer />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<Form socket={socket} setUser={setUser} />} />
          <Route path="/:roomId" element={<RoomPage user={user} socket={socket} />} />
        </Routes>
      </div>
    </>
  )
}
export default App;