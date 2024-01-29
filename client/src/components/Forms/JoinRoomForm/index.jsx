/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";
import { KeyRound, User } from "lucide-react";
import { toast } from "react-toastify";

const JoinRoom = ({ socket, setUser }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();

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
      toast.error(`Please enter a Room code.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    // Regex for a Room code with exactly 10 characters, combination of letters and numbers
    const roomIdRegex = /^[a-zA-Z0-9]{10}$/;

    if (!roomIdRegex.test(roomId)) {
      toast.error(`Please enter a valid Room code.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const userData = {
      name,
      roomId,
      userId: GeneraterandString(5),
      host: true,
      presenter: true,
    };

    console.log(userData);
    localStorage.setItem("socketUserData", JSON.stringify(userData));

    setUser(userData);
    // navigate to the whiteboard page
    navigate(`/${roomId}`);

    //emit user details
    socket.emit("userJoinedRoom", userData);
  };

  return (
    <>
      <form className="">
        <div className="flex justify-start my-4 items-center gap-3">
          <User size={30} color="#c32f57" />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-2xl w-[250px] md:w-[280px] shadow-md focus:text-[#c32f57] focus:outline-[#c32f57]"
          ></input>
        </div>

        <div className="flex w-[100%]">
          <div className="flex justify-center items-center gap-2">
            <KeyRound size={30} color="#c32f57" />
            <input
              type="text"
              placeholder="Enter Room Id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="p-2 ml-1 rounded-2xl w-[250px] md:w-[280px] shadow-md focus:text-[#c32f57] focus:outline-[#c32f57]"
            ></input>
          </div>
        </div>

        <button
          className="p-2 bg-[#c32f57] hover:bg-[#c32f57]/90 my-12 text-white font-semibold rounded-md"
          onClick={handleJoinRoom}
        >
          Enter Room
        </button>
      </form>
    </>
  );
};

export default JoinRoom;
