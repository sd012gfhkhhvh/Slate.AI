/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "./index.css"

export const ChatBox = (prop) => {
    const { socket, usersInRoom, user, setIsChatBox, setIsUserPanel } = prop;
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on("onMessage", (data) => {
            setMessages((prevMsg) => [...prevMsg, data]);
        })
    }, [socket]) // bug: if you pass the message to the dependencies array it will rerender messages.length times

    const handleInput = (e) => {
        e.preventDefault()
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit");
        if (input.trim() !== "") {
            socket.emit("message", { message: input })
            setMessages((prevMsg) =>
                [...prevMsg, { message: input, name: "You" }]
            );
        }
    }

    return (
        <div className="main-panel d-flex flex-column justify-content-start border border-black rounded-4">
            {/* closeButton */}
            <div className="d-flex justify-content-end m-2">
                <button className="btn btn-primary btn-sm" onClick={() => { setIsUserPanel(false); setIsChatBox(false) }}>X</button>
            </div>

            <div className="d-flex flex-column justify-content-between h-100">
                {/* chatbox */}
                <div className="chat-container container">
                    <h5 className="text-center text-dark py-1">Room Chat</h5>
                    <div className="chat-field container-fluid rounded-2">
                        {messages.map((msg) =>
                            <p key={user.socketId} className="chats border py-1 px-3 my-2 rounded-3">{`${msg.name}: ${msg.message}`}</p>
                        )}
                    </div>
                </div>

                {/* textarea */}
                <div className="px-2 d-flex align-items-center justify-content-center">
                    <textarea
                        type="text"
                        placeholder="Enter message"
                        value={input}
                        onChange={handleInput}
                        className="scrollabletextbox form-control my-2 border-0 me-1 rounded-5 overflow-auto"
                    ></textarea>
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm rounded-5"
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
