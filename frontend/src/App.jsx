import React from "react";
import KanbanBoard from "./components/Kanban Board/KanbanBoard";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function ToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="bg-zinc-500 rounded p-2 m-3 hover:bg-zinc-700"
      >
        Toggle Theme
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToggleButton />
      <KanbanBoard />
    </ThemeProvider>
  );
}

export default App;
