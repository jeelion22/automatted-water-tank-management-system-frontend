import React from "react";
import "./Chatbot.css";

const Chatbot = () => {
  function changeActive(element) {
    // Remove 'active' class from all elements
    document.querySelectorAll(".bottom-nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add 'active' class to the clicked element
    element.classList.add("active");
  }

  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");

  const inputInitHeight = chatInput.scrollHeight;

  const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent =
      className === "outgoing"
        ? `<p></p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
  };

  const predefinedResponses = {
    "how are you":
      "I'm just a computer program, but I'm doing well. How can I assist you?",
    hi: "Welcome to the app !",

    "what are the sensors used": "float sensor, gas sensor, solar sensor",

    "which country":
      "I don't belong to any specific country. I'm here to help you with your queries.",
    "how many data points created": "6",
    "show me 10 records randomly": "70% No methane 1000 lumens",
    Contact: "Email us at : contact@comapny.com",
    contact: "Email us at : contact@comapny.com",
    help: "Email us at : contact@comapny.com",
    "for a particular id, how many devices are on now currently running": "1",
    "tell me the name of your problem statement":
      "Automated Water Tank mangement System",
    default: "I'm not sure how to respond to that. Ask me something else.",
  };

  const handleChat = () => {
    const userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);

      // Check if the user's message has a predefined response
      const predefinedResponse = predefinedResponses[userMessage.toLowerCase()];
      if (predefinedResponse) {
        // If a predefined response exists, use it
        incomingChatLi.querySelector("p").textContent = predefinedResponse;
      } else {
        // Otherwise, provide a default response
        incomingChatLi.querySelector("p").textContent =
          predefinedResponses.default;
      }
    }, 600);
  };

  chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without the Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () =>
    document.body.classList.remove("show-chatbot")
  );
  chatbotToggler.addEventListener("click", () =>
    document.body.classList.toggle("show-chatbot")
  );

  return (
    <div class="chatbot-container">
      <button class="chatbot-toggler">
        <span class="material-symbols-rounded">mode_comment</span>
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="chatbot">
        <header>
          <h2>Chatbot</h2>
          <span class="close-btn material-symbols-outlined">close</span>
        </header>
        <ul class="chatbox">
          <li class="chat incoming">
            <span class="material-symbols-outlined">smart_toy</span>
            <p>
              Hi there 👋
              <br />
              How can I help you today?
            </p>
          </li>
        </ul>
        <div class="chat-input">
          <textarea
            placeholder="Enter a message..."
            spellcheck="false"
            required
          ></textarea>
          <span id="send-btn" class="material-symbols-rounded">
            send
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
