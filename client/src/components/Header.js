import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation between pages
import { useAuth } from "../context/AuthContext"; // Import custom hook for authentication context

const Header = () => {
  const { user, logout } = useAuth(); // Extract user and logout function from auth context

  return (
    <header style={headerStyle}>
      {" "}
      {/* Header element styled with the 'headerStyle' */}
      <nav style={navStyle}>
        {" "}
        {/* Navigation container styled with 'navStyle' */}
        <div style={logoStyle}>
          {" "}
          {/* Logo container with applied 'logoStyle' */}
          <Link to="/" style={logoTextStyle}>
            {" "}
            {/* Home page link with styled 'logoTextStyle' */}
            Expense Tracker
          </Link>
        </div>
        <ul style={navListStyle}>
          {" "}
          {/* Unordered list for navigation links with 'navListStyle' */}
          <li>
            <Link to="/dashboard" style={navLinkStyle}>
              {" "}
              {/* Link to the Dashboard page */}
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/expenses/report" style={navLinkStyle}>
              {" "}
              {/* Link to Expense Report page */}
              Expense Report
            </Link>
          </li>
          {/* Conditional rendering based on user authentication status */}
          {!user ? (
            <>
              {/* Links shown if the user is not logged in */}
              <li>
                <Link to="/" style={navLinkStyle}>
                  {" "}
                  {/* Link to Login page */}
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" style={navLinkStyle}>
                  {" "}
                  {/* Link to Register page */}
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              {/* Logout button displayed when the user is logged in */}
              <button onClick={logout} style={logoutButtonStyle}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Styles for the header
const headerStyle = {
  background: "linear-gradient(135deg, #0077B6, #023E8A)", // Gradient background from blue tones
  color: "#FFF", // White text color
  padding: "12px 20px", // Padding around the header
  position: "sticky", // Keeps the header at the top when scrolling
  top: 0, // Stick the header to the top
  width: "100%", // Full width for the header
  zIndex: 1000, // Ensures the header stays on top of other content
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Soft shadow to create depth
};

// Navigation container styling
const navStyle = {
  display: "flex", // Flexbox layout for the navigation
  justifyContent: "space-between", // Spread items across the container
  alignItems: "center", // Vertically center the items
  maxWidth: "1200px", // Max width for the navigation content
  margin: "0 auto", // Center the navigation container
};

// Logo styling
const logoStyle = {
  fontSize: "20px", // Font size for the logo
  fontWeight: "bold", // Bold font for the logo
};

const logoTextStyle = {
  color: "#fff", // White color for the logo text
  textDecoration: "none", // Remove underline from the link
  fontSize: "22px", // Slightly larger font size for the logo
};

// Navigation list styling
const navListStyle = {
  listStyleType: "none", // Remove default bullet points for the list
  display: "flex", // Flexbox layout for the navigation links
  gap: "20px", // Add space between the navigation items
  alignItems: "center", // Vertically align the items
};

// Navigation link styling
const navLinkStyle = {
  color: "#FFF", // White color for the navigation links
  textDecoration: "none", // Remove underline from the links
  fontSize: "16px", // Font size for the links
  fontWeight: "500", // Medium weight for the link text
  padding: "8px 12px", // Padding around the links
  borderRadius: "5px", // Rounded corners for the links
  transition: "0.3s", // Smooth transition effect for hover
};

// Hover effect for the navigation links
navLinkStyle[":hover"] = {
  backgroundColor: "#0096C7", // Light blue background on hover
  color: "#FFF", // White text color on hover
};

// Logout button styling
const logoutButtonStyle = {
  backgroundColor: "#E63946", // Red background color for the logout button
  color: "#fff", // White text color for the button
  border: "none", // Remove the default border
  padding: "8px 15px", // Padding for the button
  cursor: "pointer", // Pointer cursor on hover
  borderRadius: "5px", // Rounded corners for the button
  fontSize: "16px", // Font size for the button text
  transition: "0.3s", // Smooth transition for hover effect
};

// Hover effect for the logout button
logoutButtonStyle[":hover"] = {
  backgroundColor: "#D62839", // Darker red background on hover
};

export default Header; // Export the Header component for use in other files
