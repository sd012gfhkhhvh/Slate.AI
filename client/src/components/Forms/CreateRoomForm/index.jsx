/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";

const CreateRoom = ({ socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  //generating random ID
  const generateRandomString = (length) => {
    return GeneraterandString(length);
  };

  const handleGenerateRoomId = () => {
    setRoomId(generateRandomString(10));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
  };

  const handleGenerateRoom = (e) => {
    e.preventDefault(); //to prevent the default behaviour

    const userData = {
      name,
      roomId,
      userId: generateRandomString(5),
      host: true,
      presenter: true,
    };

    setUser(userData);
    console.log(userData);

    //emit user details
    socket.emit("userJoinedRoom", userData);

    // navigate to the whiteboard page
    navigate(`/${roomId}`);
  };

  return (
    <>
      <form className="  mt-5">
        <div className="">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border-[1px] border-solid border-gray-300 focus:outline-blue-600 w-[100%] rounded-md my-2"
          ></input>
        </div>
        <div className=" border">
          <div className=" flex items-center justify-center">
            <input
              type="text"
              placeholder="Generate room code"
              value={roomId}
              className="p-2 border-[1px] border-solid border-gray-300 focus:outline-blue-600 rounded-md"
              disabled
            ></input>
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                className="p-2 bg-blue-600 text-white font-bold rounded-md"
                onClick={handleGenerateRoomId}
              >
                Generate
              </button>
              <button
                type="button"
                className="p-2 border-red-700 border-[1px] border-solid  text-red-700 font-bold rounded-md"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        <button
          className="mt-4 p-2 bg-blue-600 text-white font-bold rounded-md w-[100%]"
          onClick={handleGenerateRoom}
        >
          Generate Room
        </button>
      </form>
    </>
  );
};

export default CreateRoom;
