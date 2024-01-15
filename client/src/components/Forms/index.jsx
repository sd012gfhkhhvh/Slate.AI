/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoomForm";
import JoinRoom from "./JoinRoomForm";
import joinRoomImage from "../../assets/JoinRoomImage.webp";
import logo from "../../assets/SlateAI-Logo.png";

const Form = ({ socket, setUser }) => {
  const [isJoinRoomForm, setIsJoinRoomForm] = useState(false);

  useEffect(() => {
    console.log("form page");
  });
  return (
    <main className="flex justify-center h-[100vh] w-[100vw] items-center">
      <div className="flex-1 h-full hidden md:block">
        <div className="h-full w-full bg-white"></div>
      </div>

      <div className="flex-1 h-full">
        {isJoinRoomForm ? (
          <div className="h-full hidden md:block w-full bg-[#4454b4]"></div>
        ) : (
          <div className="h-full hidden md:block w-full bg-[#c32f57]"></div>
        )}
        <img
          src={joinRoomImage}
          alt=""
          className="h-[100%] w-[100%] object-cover relative -z-20 md:hidden"
        />
        {isJoinRoomForm ? (
          <div className="absolute top-0 left-0 w-full h-full bg-[#4454b4] text-white opacity-50 -z-10"></div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-[#c32f57] text-white opacity-50 -z-10"></div>
        )}
      </div>

      <div
        className="flex h-[500px] justify-center w-[90vw] max-w-[1200px] flex-col md:flex-row items-center
        bg-white rounded-lg  shadow-md absolute top-1/2 left-[53%] transform -translate-x-1/2 -translate-y-1/2
        "
      >
        <div className="h-[100%] w-[50%] flex-1 relative md:flex hidden z-10">
          <img
            src={joinRoomImage}
            alt=""
            className="h-[100%] w-[100%] object-cover relative -z-10"
          />
          {isJoinRoomForm ? (
            <div className="absolute top-0 left-0 w-full h-full bg-[#4454b4] text-white opacity-50 -z-10"></div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-[#c32f57] text-white opacity-50 -z-10"></div>
          )}
        </div>

        <div className="flex-col justify-center w-[90vw] flex-1 h-[100%] p-6  relative z-30 items-center">
          <div className="flex my-4  justify-center items-center ">
            <div className="">
              <img
                className="w-[50px] h-auto object-cover "
                src={logo}
                alt="logo"
              />
            </div>
            <h2 className="text-4xl">Slate.AI</h2>
          </div>

          {!isJoinRoomForm ? (
            <div className="w-[100%]  p-3 flex  flex-col justify-center items-center md:items-start">
              <div className="flex flex-col justify-center items-start ">
                <h1 className="font-bold text-3xl text-[#4454b4]">
                  Create room
                </h1>
                <CreateRoom socket={socket} setUser={setUser} />
              </div>
            </div>
          ) : (
            <div className="w-[100%] p-3 flex  flex-col justify-center items-center md:items-start">
              <div className="flex flex-col justify-center items-start ">
                <h1 className="font-bold text-3xl text-[#c32f57]">Join room</h1>
                <JoinRoom socket={socket} setUser={setUser} />
              </div>
            </div>
          )}

          {isJoinRoomForm ? (
            <div className="flex justify-center items-center gap-1 md:gap-2">
              <p>Want to create a room instead?</p>
              <p
                onClick={() => setIsJoinRoomForm(false)}
                className="text-[#c32f57] select-none cursor-pointer font-semibold underline"
              >
                create room
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1 md:gap-2">
              <p>Have a room code already?</p>
              <p
                onClick={() => setIsJoinRoomForm(true)}
                className="text-[#4454b4] cursor-pointer select-none font-semibold underline"
              >
                join room
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Form;
