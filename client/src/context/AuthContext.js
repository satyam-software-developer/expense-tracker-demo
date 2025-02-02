import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
const AuthContext = createContext();

// Create a custom provider component for managing authentication state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage if available (for persistent login across sessions)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login function (replace this with an actual API call in production)
  const login = useCallback(
    (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
      navigate("/dashboard"); // Redirect to the dashboard after login
    },
    [navigate]
  );

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page after logout
  }, [navigate]);

  // Function to check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return user !== null;
  }, [user]);

  // Value to be provided by the context
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access the AuthContext easily in other components
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
