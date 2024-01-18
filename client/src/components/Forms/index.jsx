/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import CreateRoom from "./CreateRoomForm";
import JoinRoom from "./JoinRoomForm";
import "./index.css";
const Form = ({ socket, setUser }) => {
  useEffect(() => {
    console.log("form page");
  });
  return (
    <div className="row h-100 pt-5">
      <div className="form-box col-md-4 mt-5 form-box p-5 border border-primary rounded-4 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-primary fw-bold">Create Room</h1>
        <CreateRoom socket={socket} setUser={setUser} />
      </div>
      <div className="form-box col-md-4 mt-5 form-box p-5 border border-primary rounded-4 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-primary fw-bold">Join Room</h1>
        <JoinRoom socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};

export default Form;
