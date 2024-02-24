import React, { useState } from "react";
import Loader from "../../Forms/CreateRoomForm/Loader";
import { GeneraterandString } from "../../../helper/GeneraterandString";
import { KeyRound, User } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ socket, setUser }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting the join room process

    // Validate name and roomId
    if (!name) {
      toast.error(`Please enter your name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false); // Set loading state to false when validation fails
      return;
    }

    // Regex for a name with at least 3 characters, only letters, and optional spaces
    const nameRegex = /^[a-zA-Z]{3,}(?:\s[a-zA-Z]+)*$/;

    if (!nameRegex.test(name)) {
      toast.error(`Please enter a valid name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    if (!roomId) {
      toast.error(`Please enter a Room code.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    // Regex for a Room code with exactly 10 characters, combination of letters and numbers
    const roomIdRegex = /^[a-zA-Z0-9]{10}$/;

    if (!roomIdRegex.test(roomId)) {
      toast.error(`Please enter a valid Room code.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    const userData = {
      name,
      roomId,
      userId: GeneraterandString(5),
      host: true,
      presenter: true,
    };

    localStorage.setItem("socketUserData", JSON.stringify(userData));
    setUser(userData);

    try {
      // Simulate API call or any asynchronous operation here
      // Instead of setTimeout, you would typically make an API call to join the room
      // Example: await joinRoomAPI(userData);

      // Emit user details
      socket.emit("userJoinedRoom", userData);

      // Navigate to the whiteboard page
      navigate(`/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error(`Error joining room: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false); // Set loading state to false after the join room process is completed (whether successful or not)
    }
  };

  return (
    <>
      {loading && <Loader text="Joining Room" />} {/* Render the Loader component when loading */}
      {!loading && (
        <form className="">
          <div className="flex justify-start my-4 items-center gap-3">
            <User size={30} color="#c32f57" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-2xl w-[250px] md:w-[280px] shadow-md focus:text-[#c32f57] focus:outline-[#c32f57]"
            />
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
              />
            </div>
          </div>

          <button
            className="p-2 bg-[#c32f57] hover:bg-[#c32f57]/90 my-12 text-white font-semibold rounded-md"
            onClick={handleJoinRoom}
          >
            Enter Room
          </button>
        </form>
      )}
    </>
  );
};

export default JoinRoom;
