import { useState } from "react";
import "./Chatbot.css";
import bot from "./assets/bot.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-bot-container" aria-label="Chatbot">
      <div
        className="chatbot-icon-container"
        onClick={toggleChatbot}
        aria-label="Open Chatbot"
        role="button"
      >
        <img src={bot} alt="Chat Bot Icon" />
      </div>

      {isOpen && (
        <div className="chatbot-iframe-container">
          <div className="chatbot-iframe-container">
            <iframe
              src="https://my-chatbot-hack.onrender.com/"
              title="Chatbot"
              className="chatbot-iframe"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
