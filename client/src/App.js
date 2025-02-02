import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider for authentication context
import Header from "./components/Header"; // Import Header component
import Footer from "./components/Footer"; // Import Footer component
import DashboardPage from "./pages/DashboardPage"; // Import Dashboard page
import LoginPage from "./pages/LoginPage"; // Import Login page
import RegisterPage from "./pages/RegisterPage"; // Import Register page
import ExpenseReportPage from "./pages/ExpenseReportPage"; // Import Expense Report page

/**
 * Main App component that defines the application structure.
 * It includes routing, authentication provider, and layout components.
 */
const App = () => {
  return (
    <Router>
      {" "}
      {/* Wrap the application with Router to enable routing */}
      <AuthProvider>
        {" "}
        {/* Provide authentication context to the entire app */}
        <Header /> {/* Render the Header component */}
        {/* Main content area */}
        <main style={appContainerStyle}>
          <Routes>
            {" "}
            {/* Define application routes */}
            {/* Route for login page (default page) */}
            <Route path="/" element={<LoginPage />} />
            {/* Route for registration page */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Route for dashboard page (protected) */}
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Route for expense report page */}
            <Route path="/expenses/report" element={<ExpenseReportPage />} />
          </Routes>
        </main>
        <Footer /> {/* Render the Footer component */}
      </AuthProvider>
    </Router>
  );
};

// Inline styles for the main application container
const appContainerStyle = {
  padding: "20px",
  minHeight: "100vh", // Ensure the container takes up the full height of the viewport
  display: "flex",
  flexDirection: "column",
};

export default App; // Export the App component as the default export
