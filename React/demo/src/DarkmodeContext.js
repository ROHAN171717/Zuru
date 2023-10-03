import React, { createContext, useState } from "react";

const DarkmodeContext = createContext();

const DarkModeProvider = (props) => {
  const [darkMode, setdarkMode] = useState(false);
  const toggleDarkMode = () => {
    setdarkMode(!darkMode);
  };
  return (
    <div>
      <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </DarkmodeContext.Provider>
    </div>
  );
};

export { DarkmodeContext, DarkModeProvider };
