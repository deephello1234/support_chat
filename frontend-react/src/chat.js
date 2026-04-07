import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import "./styles/chat.css";

const API_URL = "http://127.0.0.1:5000/chat";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    setLoading(true);

    try {
      const res = await axios.post(API_URL, {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chat-container">
          
          {/* Header */}
          <div className="chat-header">
            <div>
              <div className="chat-title">Support</div>
              <div className="chat-status">🟢 Active now</div>
            </div>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender} text={msg.text} />
            ))}

            {loading && <div className="typing">Typing...</div>}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <textarea
              value={input}
              ref={textareaRef}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Write a message..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;