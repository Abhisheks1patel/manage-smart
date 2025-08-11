import React, { useState } from "react";

const Taskinput = ({ onAddTask }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAddTask(trimmedInput);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a task like 'Remind me to call tomorrow at 5 PM in office'"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="bg-yellow-200 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg transition"
      >
        Add
      </button>
    </div>
  );
};

export default Taskinput;
