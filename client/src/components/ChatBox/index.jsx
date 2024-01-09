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
            <div className="d-flex justify-content-end my-2 me-2">
                <button className="btn btn-primary" onClick={() => { setIsUserPanel(false); setIsChatBox(false) }}>X</button>
            </div>
            <div className="chat-container py-1 container">
                <h4 className="text-center text-dark border border-dark py-1">Chat-Box</h4>
                <div className="chat-field container-fluid">
                    {messages.map((msg) => {
                        return <div key={user.userId} className="chats">
                            <p>{`${msg.name}: ${msg.message}`}</p>
                        </div>
                    })}
                </div>
                <div className="from-group container bg-dark d-flex justify-content-between mt-1">
                    <div className="input-group d-flex align-items-center justify-content-center">
                        <textarea
                            type="text"
                            placeholder="Send message"
                            value={input}
                            onChange={handleInput}
                            className="scrollabletextbox form-control my-2 border-0 me-2 rounded-1 overflow-auto"
                        ></textarea>
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleSubmit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
