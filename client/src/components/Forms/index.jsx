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
    <div className="md:flex md:justify-center md:items-center md:gap-3 h-100 pt-5">
      <div className="h-[25rem] mt-5  p-5 border-2  border-blue-600 border-solid rounded-md mx-auto flex flex-col items-center">
        <h1 className="text-blue-600 font-bold">Create Room</h1>
        <CreateRoom socket={socket} setUser={setUser} />
      </div>
      <div className="h-[25rem] mt-5 md:w-[400px]  p-5 border-2  border-blue-600 border-solid rounded-md mx-auto flex flex-col items-center">
        <h1 className="text-blue-600 font-bold">Join Room</h1>
        <JoinRoom socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};
export default Form;
