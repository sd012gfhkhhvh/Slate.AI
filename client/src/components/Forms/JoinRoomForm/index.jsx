/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";

const JoinRoom = ({ socket, setUser }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();

    const userData = {
      name,
      roomId,
      userId: GeneraterandString(5),
      host: true,
      presenter: true,
    };

    console.log(userData);

    setUser(userData);
    // navigate to the whiteboard page
    navigate(`/${roomId}`);

    //emit user details
    socket.emit("userJoinedRoom", userData);
  };

  return (
    <>
      <form className="w-[100%]">
        <div className="">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-[1px] border-solid border-gray-300 focus:outline-blue-600 w-[100%] rounded-md my-2"
          ></input>
        </div>

        <div className="">
          <input
            type="text"
            placeholder="Enter Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 border-[1px] border-solid border-gray-300 focus:outline-blue-600 w-[100%] rounded-md my-2"
          ></input>
        </div>

        <button
          className="mt-4 p-2 bg-blue-600 text-white font-bold rounded-md w-[100%]"
          onClick={handleJoinRoom}
        >
          Enter Room
        </button>
      </form>
    </>
  );
};

export default JoinRoom;
