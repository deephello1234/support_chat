import React from "react";
import "./styles/chat.css";

function Message({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <div className="bubble">{text}</div>
    </div>
  );
}

export default Message;