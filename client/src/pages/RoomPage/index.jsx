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

export const RoomPage = ({ user, socket }) => {
  const navigate = useNavigate();

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

  return (
    // main div of canvas page
    <div className="mainCanvas d-flex flex-wrap">
      {/* toolbar implementation */}
      <div className="d-flex flex-column justify-content-between align-items-center">
        {/* Undo and Redo Button */}
        <div className="w-100 d-flex justify-content-evenly">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleUndo}
            disabled={elements.length <= 0}
          >
            Undo
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleRedo}
            disabled={removedElements.length <= 0}
          >
            Redo
          </button>
        </div>
        {/* Choose drawing element start */}
        <div className="d-flex border rounded-3 flex-column gap-2 py-3 px-2">
          <div className="d-flex p-2 gap-2 align-items-center">
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
          <div className="d-flex p-2 gap-2 align-items-center">
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
          <div className="d-flex p-2 gap-2 align-items-center">
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
          <div className="d-flex p-2 gap-2 align-items-center">
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
          </div>
        </div>

        {/* Color picker */}
        <div className="">
          <div className="d-flex align-items-center">
            <label htmlFor="color">Color: </label>
            <input
              type="color"
              id="color"
              className="ms-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></input>
          </div>
        </div>

        {/* Leave Room Button */}
        <div className="w-100">
          <button
            onClick={handleLeaveRoom}
            className="btn btn-danger container"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Whiteboard Implementation */}
      <div className="canvas-box col-md-9 mx-auto">
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

      {/* Utis Button */}
      <div className="d-flex flex-column justify-content-between">
        {/* Clear Canvas Button */}
        <div className="w-100">
          <button
            onClick={handleClearCanvas}
            className="container btn btn-outline-danger"
          >
            Clear canvas
          </button>
        </div>
        <div className="d-flex px-2">
          <button
            className="btn btn-outline-info my-2 me-3"
            onClick={(e) => {
              e.preventDefault();
              setIsUserPanel(true);
            }}
          >
            Peoples
          </button>
          <button
            className="btn btn-outline-info my-2"
            onClick={(e) => {
              e.preventDefault();
              setIsChatBox(true);
            }}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};
