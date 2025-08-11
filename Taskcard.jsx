import React from "react";

const TaskCard = ({ task, onDelete, onToggle, onRemind }) => {
  return (
    <div className="border p-4 rounded mb-2 shadow-md dark:bg-gray-800 group transition duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h3>
          {task.date && <p className="text-sm text-gray-500">📅 {task.date}</p>}
          {task.time && <p className="text-sm text-gray-500">⏰ {task.time}</p>}
          {task.place && <p className="text-sm text-gray-500">📍 {task.place}</p>}
        </div>

        {/* Action Buttons - only visible on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onToggle}
            className="text-blue-500 text-sm hover:underline hover:scale-105 transition"
          >
            {task.completed ? "Undo" : "Done"}
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 text-sm hover:underline hover:scale-105 transition"
          >
            Delete
          </button>
          <button
            onClick={() => onRemind(task)}
            className="text-green-500 text-sm hover:underline hover:scale-105 transition"
          >
            Remind
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
