/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoomForm";
import JoinRoom from "./JoinRoomForm";
import joinRoomImage from "../../assets/JoinRoomImage.webp";
import logo from "../../assets/SlateAI-Logo.png";
import { Outlet } from "react-router-dom";

const Form = ({ socket, setUser }) => {
  const [isJoinRoomForm, setIsJoinRoomForm] = useState(false);

  useEffect(() => {
    console.log("form page");
  }, []);
  return (
    <main className="flex justify-center h-[100vh] w-[100vw] items-center">
      <div className="h-full md:flex-1 bg-white  md:justify-end items-center md:flex hidden">
        <div className="h-[500px] w-[50%] max-w-[500px] flex-1 relative flex  z-10">
          <img
            src={joinRoomImage}
            alt=""
            className="h-[100%] w-[100%] object-cover shadow-md relative -z-10"
          />
          {isJoinRoomForm ? (
            <div className="absolute select-none top-0 left-0 w-full h-full bg-[#4454b4] text-white opacity-50 -z-10"></div>
          ) : (
            <div className="absolute select-none  top-0 left-0 w-full h-full bg-[#c32f57] text-white opacity-50 -z-10"></div>
          )}
        </div>
      </div>

      <div
        className={
          isJoinRoomForm
            ? `flex-1 w-full h-full flex justify-center md:justify-start items-center md:bg-[#4454b4]`
            : `flex-1 w-full h-full flex justify-center md:justify-start items-center md:bg-[#c32f57]`
        }
      >
        {/* this is snippet for background image in mobile view */}
        <div className="h-full w-full absolute top-0 left-0 -z-10">
          <img
            src={joinRoomImage}
            alt=""
            className="h-[100%] w-[100%] object-cover relative -z-10"
          />
          {isJoinRoomForm ? (
            <div className="absolute select-none  top-0 left-0 w-full h-full bg-[#4454b4] text-white opacity-70 -z-10"></div>
          ) : (
            <div className="absolute select-none  top-0 left-0 w-full h-full bg-[#c32f57] text-white opacity-70 -z-10"></div>
          )}
        </div>

        {/* this is the actual form card component */}
        <div className="flex-col h-[500px] min-w-[300px] max-w-[500px] bg-white shadow-md relative z-30 justify-center md:w-[50%] w-[40%] flex-1 p-6 items-center">
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
      <Outlet />
    </main>
  );
};

export default Form;
