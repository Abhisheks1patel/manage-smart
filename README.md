# Smart Task Manager - Complete File Details & Features

A React-based smart task manager with natural language input, AI suggestions, recurring tasks, reminders, overdue highlighting, and stats — all saved locally with theme toggle.

---

## Project Structure & File Descriptions

### `src/App.js`

- **Main Application Component**  
- Manages overall app state: tasks, theme, sorting, undo, reminders, AI suggestions, completed vs pending views, stats display.  
- Handles loading/saving tasks & theme from/to `localStorage`.  
- Implements recurring task logic and overdue task highlighting.  
- Schedules browser notification reminders automatically based on task due dates/times.  
- Renders main UI with `<Navbar>`, `<TaskInput>`, `<TaskList>`, `<CompletedTasks>`, `<StatsDashboard>`, and AI suggestions section.  
- Contains helper functions: `addTask()`, `toggleCompletion()`, `deleteTask()`, `handleUndo()`, `handleManualReminder()`, `sortTasks()`, and theme toggling.

---

### `src/components/Navbar.jsx`

- Displays the app title and a toggle button to switch between light and dark themes.  
- Calls a prop function from `App.js` to toggle theme globally.

---

### `src/components/TaskInput.jsx`

- Input form for adding new tasks.  
- Supports natural language text entry parsed by `Parsetask` utility.  
- Includes a dropdown to select recurrence option: None, Daily, Weekly, Monthly.  
- Calls a callback prop to add parsed task objects to the main task list.

---

### `src/components/TaskList.jsx`

- Displays list of pending (incomplete) tasks.  
- Each task shows title, due date/time, and action buttons to mark complete, delete, or trigger manual reminder.  
- Overdue tasks are visually highlighted (e.g., with red text or background).  
- Calls callback props from `App.js` to update task state (complete/delete/remind).

---

### `src/components/CompletedTasks.jsx`

- Similar to `TaskList` but for completed tasks only.  
- Shows completed tasks with options to toggle completion back or delete permanently.  
- Supports manual reminders as well.

---

### `src/components/StatsDashboard.jsx`

- Displays monthly task completion statistics with a bar chart.  
- Helps visualize productivity and trends over time.

---

### `src/components/Mascot.jsx`

- Animated mascot character for UI engagement.  
- Interacts with AI-generated task suggestions dynamically.

---

### `src/utils/Parsetask.js`

- Parses natural language input strings into structured task objects.  
- Extracts key fields: title, date, time, recurrence, place, etc.  
- Used by `App.js` to convert raw text input into actionable task data.

---

### `src/utils/aiSuggestions.js`

- Analyzes current tasks to find free time slots or task gaps.  
- Generates AI-based smart suggestions for new tasks or reminders.  
- Returns an array of suggestion strings displayed in the UI.

---

### `src/App.css`

- Styling rules using Tailwind CSS utility classes.  
- Supports light/dark mode, responsive layout, and consistent spacing and typography.

---

## Core Features Summary

- **Natural Language Input:** Add tasks with casual sentences; intelligently parsed.  
- **Recurring Tasks:** Daily, weekly, monthly repeats auto-generate next tasks upon completion.  
- **Overdue Highlighting:** Visually flag tasks that are past due and not completed.  
- **Task Sorting:** Sort tasks by date or name for better organization.  
- **Undo Delete:** Restore deleted tasks within 5 seconds to avoid accidental loss.  
- **Automatic & Manual Reminders:** Browser notifications for deadlines; manual triggers for any task.  
- **AI Suggestions:** Smart task ideas based on free time, shown interactively with the mascot.  
- **Stats Dashboard:** Visual monthly insights on task completions.  
- **Light/Dark Theme:** User-controlled theme with local persistence.  
- **LocalStorage Persistence:** All data saved in browser for offline access and session continuity.

---

## How It Works Together

- User opens app → `App.js` loads tasks and theme from localStorage.  
- User enters task in `TaskInput`, selects recurrence → parsed and added to tasks state.  
- Tasks are rendered in `TaskList` or `CompletedTasks` based on status.  
- Scheduled reminders set for tasks with due date/time.  
- AI suggestions update automatically to help user add new meaningful tasks.  
- User toggles theme via `Navbar`.  
- Stats view shows completion data in `StatsDashboard`.  
- Undo delete available as a safety net.

---

## Summary

This modular, extensible React app provides a smart productivity tool with advanced task parsing, reminders, AI suggestions, and analytics — all without backend dependencies, fully running on the client side.

---
Live link: https://manage-smart.netlify.app/
If you want help adding deployment instructions or advanced features, just ask!

