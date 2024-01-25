/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./index.css";
import { MessagesContext } from "../../context/Messages";

export const ChatBox = (prop) => {
  const { socket, usersInRoom, user, setIsChatBox, setIsUserPanel } = prop;
  const [input, setInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);

  const roomId = user?.roomId;

  useEffect(() => {
    socket.on("onMessage", (data) => {
      setMessages((prevMsg) => [...prevMsg, data]);
    });
  }, [socket]); // bug: if you pass the message to the dependencies array it will rerender messages.length times

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (input.trim() !== "") {
      socket.emit("message", { message: input, roomId });
      setMessages((prevMsg) => [...prevMsg, { message: input, name: "You" }]);
    }
  };

  return (
    <div className="fixed bottom-[6rem] right-[1rem] h-[71%] w-[20rem] z-0 bg-[#e1e1ea] flex flex-col justify-start border-[1px] border-solid border-black rounded-md">
      {/* closeButton */}
      <div className="flex justify-end m-2">
        <button
          className="p-2 rounded-md bg-[#4454b4] text-white font-bold"
          onClick={() => {
            setIsUserPanel(false);
            setIsChatBox(false);
          }}
        >
          X
        </button>
      </div>

      <div className="flex flex-col justify-between h-100">
        {/* chatbox */}
        <div className="p-3 rounded-md">
          <h5 className="text-center text-dark py-1">Room Chat</h5>
          <div className="overflow-y-auto bg-[#c4c4d5] h-[19rem] rounded-md">
            {messages &&
              messages.map((msg) => (
                <p
                  key={Math.random()}
                  className="bg-[#efeff6] border-2 border-black border-solid py-1 px-3 my-2 rounded-md"
                >{`${msg.name}: ${msg.message}`}</p>
              ))}
          </div>
        </div>

        {/* textarea */}
        <div className="px-2 w-[100%] flex items-center justify-center">
          <textarea
            type="text"
            placeholder="Enter message"
            value={input}
            onChange={handleInput}
            className="min-h-[40px] rounded-md focus:outline-[#4454b4] text-[#4454b4] max-h-[100px] p-2 m-2 w-[100%] mr-3 "
          ></textarea>
          <div className="">
            <button
              type="button"
              className="p-2 w-[100%] mb-2 rounded-md bg-[#4454b4] text-white font-bold"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
