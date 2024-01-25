import { createContext, useState } from "react";

const MessagesContext = createContext({
  messages: [],
  setMessages: () => {},
});

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const valueToShare = {
    messages,
    setMessages,
  };
  return (
    <MessagesContext.Provider value={valueToShare}>
      {children}
    </MessagesContext.Provider>
  );
};
export { MessagesContext, MessagesProvider };
