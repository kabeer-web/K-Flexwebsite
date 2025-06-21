import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('username', userData.email); // Store username in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username'); // Remove username from localStorage
  };

  const isDarkMode = false; // Add dark mode handling here if needed

  return (
    <UserContext.Provider value={{ user, login, logout, isDarkMode }}>
      {children}
    </UserContext.Provider>
  );
};
