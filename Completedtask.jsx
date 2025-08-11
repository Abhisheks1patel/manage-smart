// src/components/CompletedTasks.jsx
import React from "react";
import Taskcard from "./Taskcard";

// Displays a list of completed tasks with options to delete, undo, or remind
const CompletedTasks = ({ tasks, onDelete, onToggle, onRemind }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>

      {/* Show a message if there are no completed tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks.</p>
      ) : (
        tasks.map((task) => (
          <Taskcard
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onToggle={() => onToggle(task.id)}
            onRemind={onRemind ? () => onRemind(task) : undefined} // ✅ optional reminder
          />
        ))
      )}
    </div>
  );
};

export default CompletedTasks;
