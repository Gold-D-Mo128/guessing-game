import React from "react";

import { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Title from "./title";



/**
 * Chat Component
 * 
 * This component provides a simple chat interface that allows users
 * to view a list of messages and submit new messages. The chat messages
 * are displayed in a scrollable area, and users can type their own messages
 * which will be appended to the chat history.
 * 
 * State:
 * - messages: Array of chat messages, each with a sender and a message.
 *   Default value: 
 *   [
 *     { sender: "CPU 1", message: "hi guys" },
 *     { sender: "CPU 2", message: "Hiiiiiiii men" },
 *     { sender: "CPU 1", message: "I could play this game for hours!" },
 *   ]
 * - input: String that holds the current text input from the user.
 *   Default value: ""
 * 
 * Functions:
 * - handleSubmit(e): Handles the form submission for sending a new message.
 *   - e (event): The event object from the form submission.
 *   - Prevents the default form behavior, checks if the input is non-empty,
 *     and appends the user's message to the messages array.
 *     Resets the input field after submission.
 */


export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "CPU 1", message: "hi guys" },
    { sender: "CPU 2", message: "Hiiiiiiii men" },
    { sender: "CPU 1", message: "I could play this game for hours!" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: "You", message: input.trim() }]);
      setInput("");
    }
  };

  return (
    <div className="rounded-lg  w-[90%] h-full flex flex-col  ">
      <Title icon={<ChatBubbleOutlineIcon />} title={"Chat"} />
      <div className="bg-gray-800 rounded-lg px-2 grow overflow-y-auto text-xs font-bold flex flex-col justify-end">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span
              className={`font-semibold ${
                msg.sender.startsWith("CPU") ? "text-pink-500" : "text-blue-500"
              }`}
            >
              {msg.sender}:
            </span>
            <span className="ml-2 text-gray-300">{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 bg-slate-800 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow bg-gray-700 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Start
        </button>
      </form>
    </div>
  );
}
