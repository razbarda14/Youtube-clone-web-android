import React from "react";
import { useTheme } from "./ThemeContext";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className="darkModeToggle">
      <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default DarkModeToggle;
