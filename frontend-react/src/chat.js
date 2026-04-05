import React, { useState, useRef, useEffect } from "react"; 
import axios from "axios";
import Message from "./Message";

const API_URL = "http://127.0.0.1:5000/chat";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(API_URL, {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text:`${res.data.response}` 
        // text: `${res.data.response} (Confidence: ${res.data.confidence.toFixed(2)})`,
        
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
  {messages.map((msg, index) => (
    <Message key={index} sender={msg.sender} text={msg.text} />
  ))}
  <div ref={bottomRef} />
</div>

      <div className="input-box">
       <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Type your message..."
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
  );
}

export default Chat;