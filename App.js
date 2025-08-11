import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/Tasklist";
import CompletedTasks from "./components/Completedtask";
import StatsDashboard from "./components/StatsDashboard";
import { Parsetask } from "./utils/Parsetask";
import {getAISuggestions } from "./utils/aiSuggestions"; // ✅ Import AI suggestions
import "./App.css";


function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch {
      return [];
    }
  });
  const [suggestions, setSuggestions] = useState([]); // ✅ AI suggestions state
  const [showCompleted, setShowCompleted] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [undoData, setUndoData] = useState(null);
  const undoTimer = useRef(null);

  // Request notification permission
  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  // Schedule task reminder
  const scheduleTaskReminder = (task) => {
    if (!task.date || !task.time) return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const taskTime = new Date(`${task.date}T${task.time}`).getTime();
    const delay = taskTime - Date.now();

    if (delay > 0) {
      setTimeout(() => {
        new Notification(`Reminder: ${task.title}`, {
          body: `Due at ${task.time}`,
        });
      }, delay);
    }
  };

  // Load theme & tasks
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (Array.isArray(savedTasks)) {
        setTasks(savedTasks);
        savedTasks.forEach((t) => {
          if (!t.completed) scheduleTaskReminder(t);
        });
      }
    } catch (err) {
      console.error("Error parsing tasks from localStorage", err);
    }

    requestNotificationPermission();
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Update AI suggestions whenever tasks change
  useEffect(() => {
    const freeSlots = tasks.filter(task => !task.completed && !task.time);
    setSuggestions(getAISuggestions(freeSlots));
  }, [tasks]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Add new task
  const addTask = (inputText) => {
    if (typeof inputText !== "string") return;
    const parsed = Parsetask(inputText);
    if (!parsed.title) return;

    const newTask = { ...parsed, id: Date.now(), completed: false };
    setTasks((prev) => [newTask, ...prev]);
    scheduleTaskReminder(newTask);
  };

  // Toggle completion
  const toggleCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete with undo
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    if (!taskToDelete) return;

    setUndoData({ task: taskToDelete, type: "delete" });
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setUndoData(null), 5000);
  };

  // Undo delete
  const handleUndo = () => {
    if (!undoData) return;
    setTasks((prev) => [undoData.task, ...prev]);
    setUndoData(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  };

  // Manual reminder
  const handleManualReminder = (task) => {
    if (Notification.permission === "granted") {
      new Notification(`Reminder: ${task.title}`, {
        body: task.time ? `Due at ${task.time}` : "Don't forget this task!",
      });
    } else {
      alert("Please enable notifications to use reminders.");
    }
  };

  // Sort tasks
  const sortTasks = (list) => {
    const sorted = [...list];
    if (sortBy === "date") {
      sorted.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };

  const pendingTasks = sortTasks(tasks.filter((t) => !t.completed));
  const completedTasks = sortTasks(tasks.filter((t) => t.completed));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main className="p-4 max-w-2xl mx-auto w-full">
        <TaskInput onAddTask={addTask} />

        {undoData && (
          <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded mb-3 flex justify-between items-center">
            <span>Task deleted</span>
            <button onClick={handleUndo} className="underline text-sm">Undo</button>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded dark:bg-gray-800"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCompleted((prev) => !prev)}
              className="text-sm underline"
            >
              {showCompleted ? "View Pending Tasks" : "View Completed Tasks"}
            </button>

            <button
              onClick={() => setShowStats((prev) => !prev)}
              className="text-sm underline"
            >
              {showStats ? "Hide Stats" : "Show Monthly Stats"}
            </button>
          </div>
        </div>

        {/* ✅ AI Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="mb-4 p-3 border rounded bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold mb-2">AI Task Suggestions</h3>
            <ul>
              {suggestions.map((s, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{s}</li>
              ))}
            </ul>
          </div>
        )}

        {!showStats &&
          (showCompleted ? (
            <CompletedTasks
              tasks={completedTasks}
              onDelete={deleteTask}
              onToggle={toggleCompletion}
              onRemind={handleManualReminder}
            />
          ) : (
            <TaskList
              tasks={pendingTasks}
              onDelete={deleteTask}
              onToggle={toggleCompletion}
              onRemind={handleManualReminder}
            />
          ))}

        {showStats && <StatsDashboard tasks={tasks} />}
      </main>
    </div>
  );
}

export default App;
