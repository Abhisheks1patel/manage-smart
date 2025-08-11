import React from "react";
import TaskCard from "./Taskcard";

// Tasklist receives tasks and renders a list of TaskCard components
const Tasklist = ({ tasks, onDelete, onToggle, onRemind }) => {
  // Display a message if there are no tasks
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No tasks yet.
      </p>
    );
  }

  return (
    <div>
      {/* Render each task with TaskCard */}
      {tasks.map((task) => (
        <TaskCard
  key={task.id}
  task={task}
  onDelete={() => onDelete(task.id)}
  onToggle={() => onToggle(task.id)}
  onRemind={onRemind}
/>
      ))}
    </div>
  );
};

export default Tasklist;
