/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { EraserSizeProvider } from "./context/EraserSize/index.jsx";
import { MessagesProvider } from "./context/Messages/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <EraserSizeProvider>
      <MessagesProvider>
        <App />
      </MessagesProvider>
    </EraserSizeProvider>
  </Router>
);
