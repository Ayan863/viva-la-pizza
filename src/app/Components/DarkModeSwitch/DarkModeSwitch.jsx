import React from "react";

const DarkModeSwitch = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-switch">
      <label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => toggleDarkMode((prev) => !prev)}
        />
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
