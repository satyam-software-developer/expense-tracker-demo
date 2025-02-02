import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Login page component
const LoginPage = () => {
  // Extract login function from AuthContext
  const { login } = useAuth();
  const navigate = useNavigate();

  // State variables to manage input fields, error messages, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors

    // Validate if all fields are filled
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true); // Show loading state to prevent multiple clicks
    try {
      await login(email, password); // Call the login function from AuthContext
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      setError("Invalid email or password."); // Show error message on failure
    }
    setLoading(false); // Reset loading state
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Login</h1>
        {error && <p style={errorStyle}>{error}</p>}{" "}
        {/* Display error message if any */}
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Email Input Field */}
          <div style={inputGroupStyle}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              style={inputStyle}
              required
            />
          </div>

          {/* Password Input Field */}
          <div style={inputGroupStyle}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              style={inputStyle}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={loading ? disabledButtonStyle : submitButtonStyle}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}{" "}
            {/* Show loading text when processing */}
          </button>
        </form>
        {/* Link to Registration Page */}
        <div style={registerLinkStyle}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// **Styled Components**

// Outer container style
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Full screen height
  backgroundColor: "#f8f9fa",
  padding: "20px",
};

// Form container styling
const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow effect
  width: "320px", // Fixed width for form
  textAlign: "center",
};

// Title (Login Heading) styling
const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

// Form container styles
const formStyle = {
  display: "flex",
  flexDirection: "column",
};

// Input field group (label + input field)
const inputGroupStyle = {
  marginBottom: "15px",
  textAlign: "left",
};

// Input field styling
const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%", // Full width input
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
  transition: "border 0.3s ease", // Smooth transition effect
};

// Add focus effect to input fields
inputStyle[":focus"] = {
  border: "1px solid #007bff", // Highlight border on focus
};

// Submit button styling
const submitButtonStyle = {
  backgroundColor: "#28a745", // Green button for submission
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "0.3s",
};

// Disabled button state for loading state
const disabledButtonStyle = {
  ...submitButtonStyle, // Inherit submit button styles
  backgroundColor: "#6c757d", // Greyed out button
  cursor: "not-allowed",
};

// Button hover effect
submitButtonStyle[":hover"] = {
  backgroundColor: "#218838",
};

// Error message styling
const errorStyle = {
  color: "#e74c3c", // Red error text
  backgroundColor: "#fdecea",
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "15px",
  fontSize: "14px",
};

// Registration link container
const registerLinkStyle = {
  marginTop: "15px",
};

// Link styling
const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};

// Hover effect for links
linkStyle[":hover"] = {
  textDecoration: "underline",
};

export default LoginPage;
