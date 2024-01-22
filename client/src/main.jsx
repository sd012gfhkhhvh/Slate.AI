/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { EraserSizeProvider } from "./context/EraserSize/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <EraserSizeProvider>
      <App />
    </EraserSizeProvider>
  </Router>
);
