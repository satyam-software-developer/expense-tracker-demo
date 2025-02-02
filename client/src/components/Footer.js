import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      {" "}
      {/* Footer element with applied styles */}
      <div style={contentStyle}>
        {" "}
        {/* Content wrapper for better spacing */}
        <p>
          &copy; {new Date().getFullYear()} Expense Tracker. All rights
          reserved. {/* Displays the current year dynamically */}
        </p>
        <p>
          Designed & Developed by <strong>Satyam Kumar</strong>{" "}
          {/* Credit for design and development */}
        </p>
      </div>
    </footer>
  );
};

// Styles for an elegant footer
const footerStyle = {
  background: "linear-gradient(135deg, #0077B6, #023E8A)", // Gradient effect from blue shades
  color: "#fff", // Text color is white
  textAlign: "center", // Centers text horizontally
  padding: "15px 20px", // Adds padding around the footer content
  fontSize: "14px", // Sets a small font size for the footer text
  position: "relative", // Keeps footer position flexible on different pages
  bottom: 0, // Aligns the footer at the bottom of the page
  width: "100%", // Ensures the footer spans the entire width of the page
  boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)", // Soft shadow at the top of the footer
};

// Content wrapper for better spacing
const contentStyle = {
  maxWidth: "1200px", // Limits the content width to 1200px for better alignment
  margin: "0 auto", // Centers the content horizontally within the footer
};

export default Footer; // Exports the Footer component
