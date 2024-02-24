// Loader.jsx
import React from "react";
import "./Loader.css"; 
const Loader = ({ text }) => {
  return (
    <div className="loader-container">
      <div className="loading-text">{text}</div>
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
