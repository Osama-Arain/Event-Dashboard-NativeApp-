import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode
    ? {
        backgroundColor: '#1e1e1e',
        textColor: '#ffffff',
        buttonColor: '#007BFF',
      }
    : {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonColor: '#F39C12',
      };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
