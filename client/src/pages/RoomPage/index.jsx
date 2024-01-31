/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { WhiteBoard } from "../../components/WhiteBoard";
import { Userbar } from "../../components/Userbar";
import { ChatBox } from "../../components/ChatBox";
import { toast } from "react-toastify";

//icons
import pencilIcon from "../../assets/pencil.png";
import lineIcon from "../../assets/diagonal-line.png";
import rectIcon from "../../assets/rounded-rectangle.png";
import eraserIcon from "../../assets/Eraser.png";
import Popup from "../../components/EraserResizePopUp";

export const RoomPage = ({ user, socket }) => {
  const navigate = useNavigate();

  const popupRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil"); // Select tool
  const [color, setColor] = useState("black"); // select color
  const [elements, setElements] = useState([]); // array of different "drawing events"(elements)
  const [removedElements, setRemovedElements] = useState([]); // array of undo elements
  const [usersInRoom, setUsersInRoom] = useState([]); // array of users in a room
  const [isUserpanel, setIsUserPanel] = useState(false);
  const [isChatBox, setIsChatBox] = useState(false);

  // update users state
  useEffect(() => {
    // add users in a array(usersInRoom)
    socket.on("userIsJoined", ({ users }) => {
      console.log(users);
      setUsersInRoom(users);
    });

    // notify user join event
    socket.on("userJoinedRoom", ({ success, user }) => {
      console.log("toast check: ");
      console.log(user);
      if (success) {
        toast.info(`${user.name} has joined the room.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });

    // notify user leave event
    socket.on("onDisconnect", ({ name, socketId }) => {
      toast.info(`${name} has left the room.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setUsersInRoom((prevUser) => {
        return prevUser.filter((user) => user.socketId !== socketId);
      });
    });
  }, [socket, elements]);

  // handle clear canvas
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setElements([]);
    console.log("Cleared. elements array length: " + elements.length);
  };

  //handle Leave Room
  const handleLeaveRoom = () => {
    localStorage.removeItem("socketUserData");
    localStorage.removeItem("firstLoadDone");
    navigate("/");
  };

  //handle undo
  const handleUndo = (e) => {
    e.preventDefault();
    setRemovedElements((prevElm) => {
      console.log("removed: " + prevElm.length);
      return [...prevElm, elements[elements.length - 1]];
    });
    setElements((prevElm) => {
      console.log("prev-elements: " + prevElm.length);
      return prevElm.slice(0, prevElm.length - 1);
    });
    console.log("elements: " + elements.length);
  };

  //handle redo
  const handleRedo = (e) => {
    e.preventDefault();
    setElements((prevElm) => {
      return [...prevElm, removedElements[removedElements.length - 1]];
    });
    setRemovedElements((prevElm) => {
      return prevElm.slice(0, prevElm.length - 1);
    });
  };

  const openModal = () => {
    if (popupRef.current) {
      popupRef.current.openModal();
    }
  };

  return (
    <>
      {/* main div of canvas page */}
      <div className="flex h-screen py-2 md:flex-row flex-col justify-center items-center gap-2">
        <div className="md:w-[15%] w-[90vw] h-[100%] p-2 md:p-0 md:max-h-[1000px] md:mt-0  md:max-w-[400px] flex flex-col ">
          {/* toolbar implementation */}
          <div className="flex flex-col w-[100%] justify-center items-center md:h-[100%]">
            {/* Undo and Redo Button element for desktop view, hidden in mobile view */}
            <div className="p-2 gap-2  justify-center hidden md:flex items-center w-[100%]">
              <button
                className="p-2 rounded-md bg-[#4454b4] md:relative  text-white font-semibold"
                onClick={handleUndo}
                disabled={elements.length <= 0}
              >
                Undo
              </button>
              <button
                className="p-2 rounded-md border-[#4454b4] border-solid border-[1px] text-[#4454b4] font-semibold"
                onClick={handleRedo}
                disabled={removedElements.length <= 0}
              >
                Redo
              </button>
            </div>

            {/* Leave Room Button component for mobile view, hidden in desktop view */}
            <div className="md:hidden mb-3 mt-16 ">
              <button
                onClick={handleLeaveRoom}
                className="p-2 w-[90vw] max-w-[300px] rounded-md bg-[#c23f57] text-white font-semibold"
              >
                Leave Room
              </button>
            </div>

            {/* Choose drawing element start */}
            <div className="flex justify-center mt-10 items-center md:h-[80%] ">
              <div className="flex  md:flex-col border-[1px] rounded-md border-black border-solid">
                <div className="flex p-2 gap-2 items-center">
                  <img className="tool-logo" src={pencilIcon} alt="icon" />
                  <input
                    type="radio"
                    name="tool"
                    id="pencil"
                    value="pencil"
                    checked={tool === "pencil"}
                    className="mt-1"
                    onChange={(e) => setTool(e.target.value)}
                  ></input>
                </div>

                <div className="flex p-2 gap-2 items-center">
                  <img className="tool-logo" src={lineIcon} alt="icon" />
                  <input
                    type="radio"
                    name="tool"
                    id="line"
                    value="line"
                    checked={tool === "line"}
                    className="mt-1"
                    onChange={(e) => setTool(e.target.value)}
                  ></input>
                </div>

                <div className="flex p-2 gap-2 items-center">
                  <img className="tool-logo" src={rectIcon} alt="icon" />
                  <input
                    type="radio"
                    name="tool"
                    id="rect"
                    value="rect"
                    checked={tool === "rect"}
                    className="mt-1"
                    onChange={(e) => setTool(e.target.value)}
                  ></input>
                </div>

                <div
                  className="flex p-2 gap-2 items-center"
                  onClick={openModal}
                >
                  <img className="tool-logo" src={eraserIcon} alt="icon" />
                  <input
                    type="radio"
                    name="tool"
                    id="eraser"
                    value="eraser"
                    checked={tool === "eraser"}
                    className="mt-1"
                    onChange={(e) => setTool(e.target.value)}
                  ></input>
                  <Popup ref={popupRef} />
                </div>
              </div>
            </div>

            {/* Color picker element for desktop view, hidden in mobile view */}
            <div className="hidden md:block">
              <div className="flex items-center">
                <label htmlFor="color">Color: </label>
                <input
                  type="color"
                  id="color"
                  className="ml-2"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                ></input>
              </div>
            </div>

            {/* Leave Room Button for desktop view, hidden in mobile view */}
            <div className="hidden md:mt-3 md:block">
              <button
                onClick={handleLeaveRoom}
                className="p-2 rounded-md bg-[#c23f57] text-white font-semibold"
              >
                Leave Room
              </button>
            </div>

            <div className="flex w-[100%] justify-between mt-4 items-center">
              {/* color picker for mobile view, hidden in desktop view */}
              <div className="md:hidden">
                <div className="flex items-center">
                  <label htmlFor="color">Color: </label>
                  <input
                    type="color"
                    id="color"
                    className="ml-2"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  ></input>
                </div>
              </div>

              {/* undo and redo button for mobile view, hidden in desktop view */}
              <div className="flex  md:hidden justify-between items-center">
                <div className="p-2 gap-2 justify-center md:hidden flex items-center w-[100%]">
                  <button
                    className="p-2 rounded-md bg-[#4454b4] md:relative  text-white font-semibold"
                    onClick={handleUndo}
                    disabled={elements.length <= 0}
                  >
                    Undo
                  </button>
                  <button
                    className="p-2 rounded-md border-[#4454b4] border-solid border-[1px] text-[#4454b4] font-semibold"
                    onClick={handleRedo}
                    disabled={removedElements.length <= 0}
                  >
                    Redo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[65%] w-[90vw] md:h-[100%] h-[60%] my-3 md:my-0 md:max-h-[1000px]  flex flex-col justify-center md:max-w-[1500px] items-center">
          {/* Whiteboard Implementation */}
          <div className="w-[100%] h-[100%] border-4 my-2 border-black border-dotted rounded-md ">
            <WhiteBoard
              canvasRef={canvasRef}
              ctxRef={ctxRef}
              elements={elements}
              setElements={setElements}
              tool={tool}
              color={color}
              socket={socket}
              user={user}
            />
          </div>

          {/* Users Panel */}
          {isUserpanel && (
            <Userbar
              usersInRoom={usersInRoom}
              user={user}
              setIsChatBox={setIsChatBox}
              setIsUserPanel={setIsUserPanel}
            />
          )}
          {/* Chat Box */}
          {isChatBox && (
            <ChatBox
              socket={socket}
              UserInRoom={usersInRoom}
              user={user}
              setIsChatBox={setIsChatBox}
              setIsUserPanel={setIsUserPanel}
            />
          )}
        </div>

        <div className="md:w-[20%] md:mt-2 w-[90vw] h-[100%]  md:max-h-[1000px] flex flex-col p-3 mb-10 md:max-w-[400px] md:mb-0 ">
          {/* Utis Button */}
          <div className=" md:flex-col flex  justify-between md:h-[100%] w-[100%] ">
            {/* Clear Canvas Button */}
            <div className="flex justify-between md:justify-center items-center">
              <button
                onClick={handleClearCanvas}
                className="bg-white border-2 border-[#c23f57] border-solid text-[#c23f57] p-2 rounded-md transition-all"
              >
                Clear canvas
              </button>
            </div>

            <div className="md:block hidden bg-white w-[100%] h-[80%]"></div>
            <div className="flex justify-center items-center md:relative md:-top-[10px] gap-2 ">
              <button
                className="p-2 rounded-md bg-[#1995D1] text-white font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserPanel(true);
                  setIsChatBox(false);
                }}
              >
                People
              </button>
              <button
                className="p-2 rounded-md text-[#1995D1] border-[1px] border-solid border-[#1995d1] font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsChatBox(true);
                  setIsUserPanel(false);
                }}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
