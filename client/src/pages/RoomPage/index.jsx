/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"

import "./index.css"
import { WhiteBoard } from "../../components/WhiteBoard";
import { Userbar } from "../../components/Userbar";
import { ChatBox } from "../../components/ChatBox";

export const RoomPage = ({ user, socket }) => {

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)

    const [tool, setTool] = useState("pencil") // Select tool
    const [color, setColor] = useState("black") // select color
    const [elements, setElements] = useState([]) // array of different "drawing events"(elements)
    const [removedElements, setRemovedElements] = useState([]) // array of undo elements
    const [usersInRoom, setUsersInRoom] = useState([]); // array of users in a room
    const [isUserpanel, setIsUserPanel] = useState(false);
    const [isChatBox, setIsChatBox] = useState(false);

    // update users state
    useEffect(() => {
        socket.on("userIsJoined", ({ users }) => {
            console.log(users);
            setUsersInRoom(users);
        })

        // socket.on("onDisconnect" , (name) => {
        //     alert(`${name} has disconnected .`)
        // })

    }, [socket, elements])

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setElements([]);
        console.log("Cleared. elements array length: " + elements.length);
    }

    //handle undo
    const handleUndo = (e) => {
        e.preventDefault();
        setRemovedElements((prevElm) => {
            console.log("removed: " + prevElm.length);
            return [...prevElm, elements[elements.length - 1]]
        })
        setElements((prevElm) => {
            console.log("prev-elements: " + prevElm.length);
            return prevElm.slice(0, prevElm.length - 1)
        })
        console.log("elements: " + elements.length);
    }

    //handle redo
    const handleRedo = (e) => {
        e.preventDefault();
        setElements((prevElm) => {
            return [...prevElm, removedElements[removedElements.length - 1]]
        })
        setRemovedElements((prevElm) => {
            return prevElm.slice(0, prevElm.length - 1)
        })
    }

    return (
        // main div of canvas page
        <div className="mainCanvas">
            {/* Header */}
            <h1 className="text-center py-2">White Board Sharig App<span className="text-primary">[Users Online : {usersInRoom.length}]</span></h1>

            {/* Users Panel */}
            {isUserpanel &&
                <Userbar
                    usersInRoom={usersInRoom}
                    user={user}
                    setIsChatBox={setIsChatBox}
                    setIsUserPanel={setIsUserPanel}
                />
            }
            {/* Chat Box */}
            {isChatBox &&
                <ChatBox
                    socket={socket}
                    UserInRoom={usersInRoom}
                    user={user}
                    setIsChatBox={setIsChatBox}
                    setIsUserPanel={setIsUserPanel}
                />
            }

            {/* toolbar implementation */}
            <div className="border col-md-10 mx-auto mb-3 d-flex align-items-center justify-content-between">

                {/* Choose drawing element start */}
                <div className="d-flex col-md-2 justify-content-between gap-1">
                    <div className="d-flex gap-1 align-items-center">
                        <label htmlFor="pencil">Pencil</label>
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
                    <div className="d-flex gap-1 align-items-center">
                        <label htmlFor="line">Line</label>
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
                    <div className="d-flex gap-1 align-items-center">
                        <label htmlFor="rect">Rectrangle</label>
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
                </div>

                {/* Color picker */}
                <div className="col-md-3">
                    <div className="d-flex align-items-center">
                        <label htmlFor="color">Select Color: </label>
                        <input
                            type="color"
                            id="color"
                            className="mt-1 ms-3"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        ></input>
                    </div>
                </div>

                {/* Undo and Redo Button */}
                <div className="col-md-3 d-flex gap-2">
                    <button
                        className="btn btn-primary mt-1 "
                        onClick={handleUndo}
                        disabled={elements.length <= 0}
                    >
                        Undo
                    </button>
                    <button
                        className="btn btn-outline-primary mt-1 "
                        onClick={handleRedo}
                        disabled={removedElements.length <= 0}
                    >
                        Redo
                    </button>
                </div>

                {/* Clear Canvas Button */}
                <div className="col-md-2">
                    <button onClick={handleClearCanvas} className="btn btn-danger">Clear canvas</button>
                </div>
            </div>

            {/* Whiteboard Implementation */}
            <div className="canvas-box col-md-8 h-50 mx-auto">
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

            {/* Utis Button */}
            <div className="bg-dark mt-2 d-flex justify-content-end align-items-center">
                <button
                    className="btn btn-outline-info my-2 me-3"
                    onClick={(e) => { e.preventDefault(); setIsUserPanel(true); setIsChatBox(false); }}
                >
                    Peoples
                </button>
                <button
                    className="btn btn-outline-info my-2 me-3"
                    onClick={(e) => { e.preventDefault(); setIsChatBox(true); setIsUserPanel(false); }}
                >
                    Chat
                </button>
            </div>
        </div>
    )
}
