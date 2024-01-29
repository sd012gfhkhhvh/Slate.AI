/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";
import { User, KeyRound } from "lucide-react";
import { toast } from "react-toastify";

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
    if (roomId) {
      toast.info(`Room Code copied to clipboard.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleGenerateRoom = (e) => {
    e.preventDefault(); //to prevent the default behaviour

    // Validate name and roomId
    if (!name) {
      toast.error(`Please enter your name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    // Regex for a name with at least 3 characters, only letters, and optional spaces

    const nameRegex = /^[a-zA-Z]{3,}(?:\s[a-zA-Z]+)*$/;

    if (!nameRegex.test(name)) {
      toast.error(`Please enter a valid name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!roomId) {
      toast.error(`Please generate a Room code.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const userData = {
      name,
      roomId,
      userId: generateRandomString(5),
      host: true,
      presenter: true,
    };

    setUser(userData);
    console.log(userData);
    localStorage.setItem("socketUserData", JSON.stringify(userData));

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

        <div className="flex">
          <div className="flex justify-center items-center gap-2">
            <KeyRound size={30} color="#4454b4" className="md:hidden block" />
            <KeyRound size={38} color="#4454b4" className="md:block hidden" />
            <input
              type="text"
              placeholder="Generate room code"
              value={roomId}
              className="p-2 ml-1 md:ml-2 rounded-2xl w-[60%] md:w-[80%] shadow-md text-[#4454b4] focus:outline-[#4454b4]"
              disabled
            ></input>
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                className="p-2 bg-[#4454b4] hover:bg-[#4454b4]/90 text-white font-semibold rounded-md"
                onClick={handleGenerateRoomId}
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <button
          className="p-2 bg-[#4454b4] hover:bg-[#4454b4]/90 my-12 text-white font-semibold rounded-md"
          onClick={handleGenerateRoom}
        >
          Generate Room
        </button>
        <button
          type="button"
          className="p-2 ml-3 text-[#4454b4] bg-white hover:bg-gray-50 font-semibold rounded-md shadow-md"
          onClick={handleCopy}
        >
          Copy Code
        </button>
      </form>
    </>
  );
};

export default CreateRoom;
