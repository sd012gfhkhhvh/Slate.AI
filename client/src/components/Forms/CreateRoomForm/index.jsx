/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";
import { User } from "lucide-react";

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
      <form className="">
        <div className="flex justify-start my-4 items-center gap-3">
          <User size={30} color="#4454b4" />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-2xl w-[60%] md:w-[80%] shadow-md focus:text-[#4454b4] focus:outline-[#4454b4]"
          ></input>
        </div>

        <div className="flex w-[100%]">
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Generate room code"
              value={roomId}
              className="p-2 rounded-2xl w-[60%] md:w-[80%] shadow-md text-[#4454b4] focus:outline-[#4454b4]"
              disabled
            ></input>
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                className="p-2 bg-[#4454b4] text-white font-semibold rounded-md"
                onClick={handleGenerateRoomId}
              >
                Generate
              </button>
              <button
                type="button"
                className="p-2 text-[#4454b4] bg-white font-semibold rounded-md shadow-md"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <button
          className="p-2 bg-[#4454b4] my-12 text-white font-semibold rounded-md"
          onClick={handleGenerateRoom}
        >
          Generate Room
        </button>
      </form>
    </>
  );
};

export default CreateRoom;
