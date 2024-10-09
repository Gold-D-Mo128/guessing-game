import useStore from "@/store/useStore";
import React, { useState } from "react";

/**
 * Welcome Component
 *
 * This component serves as a welcome screen for the user, prompting them
 * to input their name before proceeding with the application. It manages
 * the state of the user's name and handles authentication via a global
 * store. Upon entering their name and clicking the 'Accept' button, the
 * user's name is set in the store, and authentication is marked as true.
 *
 *
 * State:
 * - `value`: A local state variable that holds the current input value from
 *   the text field for the player's name.
 *
 * Functionality:
 * - Displays a welcome message and an input field for the user to enter
 *   their name.
 * - The 'Accept' button is enabled only when the input field is not empty.
 * - Upon clicking the 'Accept' button, the component sets the player's name
 *   in the global state and updates the authentication status.
 *
 * Styling:
 * - The component uses Tailwind CSS for styling, providing a responsive
 *   and visually appealing layout.
 *
 * Usage:
 * ```jsx
 * <Welcome />
 * ```
 */

export default function Welcome() {
  const { player, setPlayer, setAuth } = useStore();
  const [value, setValue] = useState("");
  return (
    <div className="w-[25%] h-full bg-[#242a39] rounded-md flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center w-80">
        <h1 className="text-3xl text-gray-300 mb-6 self-start">Welcome</h1>
        <p className="text-gray-400 mb-4 text-xs">Please Insert Your Name</p>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="bg-gray-700 text-center text-white p-2 w-full rounded-md focus:outline-none"
          placeholder="Your name"
        />
        <button
          onClick={() => {
            setAuth(true);
            setPlayer(value);
          }}
          style={{
            background:
              value == ""
                ? "#8690a4 hover:bg-gray-500"
                : "linear-gradient(90deg, ,) hover:linear-gradient(90deg,#EC778E, #fca788)",
          }}
          className="mt-6 bg-gradient-to-r from-[#e85672] to-[#FC916B] hover:from-[#e4627c] hover:to-[#fba180] text-white w-full py-2 rounded-md"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
