import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './themes/ThemeContext'; // Import the ThemeProvider

const App = () => (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
);

export default App;
