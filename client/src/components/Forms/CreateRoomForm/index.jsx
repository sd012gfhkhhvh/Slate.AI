import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneraterandString } from "../../../helper/GeneraterandString";
import { User, KeyRound } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "./Loader"; // Import the Loader component
import "./Loader.css"; // Import the loader CSS file

const CreateRoom = ({ socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  // Function to generate random room ID
  const generateRandomRoomId = () => {
    return GeneraterandString(10);
  };

  const handleGenerateRoomId = () => {
    setRoomId(generateRandomRoomId());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    if (roomId) {
      toast.info(`Room Code copied to clipboard.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleGenerateRoom = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Validate name and roomId
    if (!name) {
      toast.error(`Please enter your name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false); // Stop loading
      return;
    }

    // Validate name format
    const nameRegex = /^[a-zA-Z]{3,}(?:\s[a-zA-Z]+)*$/;
    if (!nameRegex.test(name)) {
      toast.error(`Please enter a valid name.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      return;
    }

    if (!roomId) {
      toast.error(`Please generate a Room code.`, {
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

    setUser(userData);
    localStorage.setItem("socketUserData", JSON.stringify(userData));

    try {
      // Simulate API call or any asynchronous operation here
      // Instead of setTimeout, you would typically make an API call to create the room
      // Example: await createRoomAPI(userData);

      // Emit user details
      socket.emit("userJoinedRoom", userData);

      // Navigate to the whiteboard page
      navigate(`/${roomId}`);
    } catch (error) {
      console.error("Error generating room:", error);
      toast.error(`Error generating room: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <Loader text="Creating Room" />} {/* Render the Loader component when loading */}
      {!loading && (
        <div>
          <form className="">
            <div className="flex justify-start my-4 items-center gap-3">
              <User size={30} color="#4454b4" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-2xl w-[60%] md:w-[80%] shadow-md focus:text-[#4454b4] focus:outline-[#4454b4]"
              />
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
                />
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
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                "Generate Room"
              )}
            </button>
            <button
              type="button"
              className="p-2 ml-3 text-[#4454b4] bg-white hover:bg-gray-50 font-semibold rounded-md shadow-md"
              onClick={handleCopy}
            >
              Copy Code
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateRoom;
