import React, { useState } from "react"; // Import React and useState for managing state
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation and Link for routing
import { useAuth } from "../context/AuthContext"; // Import authentication context for handling registration

// RegisterPage component
const RegisterPage = () => {
  const { register } = useAuth(); // Get the register function from AuthContext
  const navigate = useNavigate(); // useNavigate hook to redirect users after registration

  // State variables to manage form inputs and UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Stores error messages
  const [loading, setLoading] = useState(false); // Prevents multiple form submissions

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(""); // Clear any previous error messages

    // Check if all fields are filled
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Disable button while processing registration
    try {
      await register(email, password); // Call register function with email and password
      navigate("/dashboard"); // Redirect to dashboard upon successful registration
    } catch (err) {
      setError("Failed to register. Please try again."); // Handle errors
    }
    setLoading(false); // Re-enable button after operation
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Register</h1>
        {error && <p style={errorStyle}>{error}</p>}{" "}
        {/* Show error message if any */}
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Email Input Field */}
          <div style={inputGroupStyle}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          {/* Confirm Password Input Field */}
          <div style={inputGroupStyle}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Link to login page */}
        <div style={loginLinkStyle}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// **Styled Components**
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f8f9fa",
  padding: "20px",
};

const formContainerStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "320px",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle = {
  marginBottom: "15px",
  textAlign: "left",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
  transition: "border 0.3s ease",
};

// Focus effect on input fields
inputStyle[":focus"] = {
  border: "1px solid #007bff",
};

const submitButtonStyle = {
  backgroundColor: "#28a745", // Green button
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "0.3s",
};

// Disabled button state for when form is being submitted
const disabledButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: "#6c757d", // Gray when disabled
  cursor: "not-allowed",
};

// Hover effect for submit button
submitButtonStyle[":hover"] = {
  backgroundColor: "#218838", // Darker green on hover
};

// Styling for error messages
const errorStyle = {
  color: "#e74c3c", // Red text
  backgroundColor: "#fdecea", // Light red background
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "15px",
  fontSize: "14px",
};

// Login link container style
const loginLinkStyle = {
  marginTop: "15px",
};

// Styling for links
const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};

// Hover effect for links
linkStyle[":hover"] = {
  textDecoration: "underline",
};

export default RegisterPage; // Export RegisterPage component
