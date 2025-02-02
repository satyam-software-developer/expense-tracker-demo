import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import authentication context to access user state and logout function
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import ExpenseTable from "../components/ExpenseTable"; // Import the ExpenseTable component to display the list of expenses

const DashboardPage = () => {
  const { user, logout } = useAuth(); // Extract user information and logout function from auth context
  const navigate = useNavigate(); // Initialize navigate function for redirection
  const [expenses, setExpenses] = useState([]); // State for storing fetched expenses
  const [totalIncome, setTotalIncome] = useState(0); // State for storing total income amount
  const [totalExpense, setTotalExpense] = useState(0); // State for storing total expense amount

  // useEffect runs when the component mounts or when 'user' changes
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if the user is not authenticated
      return;
    }

    // **Mock Data (Replace with API Call in a real application)**
    const fetchedExpenses = [
      { id: 1, amount: 500, category: "Income", description: "Salary" },
      { id: 2, amount: 200, category: "Expense", description: "Groceries" },
      { id: 3, amount: 100, category: "Expense", description: "Utilities" },
    ];

    setExpenses(fetchedExpenses); // Update state with fetched expenses

    // **Calculate total income**
    const income = fetchedExpenses
      .filter((expense) => expense.category === "Income") // Filter only "Income" entries
      .reduce((acc, curr) => acc + curr.amount, 0); // Sum up income amounts

    // **Calculate total expenses**
    const expense = fetchedExpenses
      .filter((expense) => expense.category === "Expense") // Filter only "Expense" entries
      .reduce((acc, curr) => acc + curr.amount, 0); // Sum up expense amounts

    // Update states with calculated values
    setTotalIncome(income);
    setTotalExpense(expense);
  }, [user, navigate]); // Dependencies: Runs when 'user' or 'navigate' changes

  // **Calculate net balance (Total Income - Total Expenses)**
  const netBalance = totalIncome - totalExpense;

  return (
    <div style={containerStyle}>
      {/* Display user email or "User" if email is not available */}
      <h1 style={headerStyle}>Welcome, {user?.email || "User"}!</h1>

      {/* Summary section displaying income, expenses, and net balance */}
      <div style={summaryContainerStyle}>
        {/* Total Income Card */}
        <div style={summaryCardStyle}>
          <h2>Total Income</h2>
          <p style={incomeStyle}>${totalIncome}</p>
        </div>

        {/* Total Expenses Card */}
        <div style={summaryCardStyle}>
          <h2>Total Expenses</h2>
          <p style={expenseStyle}>${totalExpense}</p>
        </div>

        {/* Net Balance Card with dynamic color based on balance */}
        <div
          style={{
            ...summaryCardStyle,
            borderColor: netBalance >= 0 ? "#2ECC71" : "#E74C3C", // Green if positive, Red if negative
          }}
        >
          <h2>Net Balance</h2>
          <p
            style={{
              color: netBalance >= 0 ? "#2ECC71" : "#E74C3C", // Change color based on balance
              fontWeight: "bold",
            }}
          >
            ${netBalance}
          </p>
        </div>
      </div>

      {/* Render the ExpenseTable component and pass expense data */}
      <ExpenseTable expenses={expenses} />

      {/* Logout button */}
      <button onClick={logout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
};

// **Styled Components**

// Main container style
const containerStyle = {
  maxWidth: "800px", // Set maximum width
  margin: "auto", // Center the container
  padding: "20px", // Add padding around the content
  textAlign: "center", // Center text alignment
};

// Header styling
const headerStyle = {
  fontSize: "24px", // Large font for the heading
  marginBottom: "20px", // Add space below the heading
};

// Container for summary cards (Income, Expenses, Net Balance)
const summaryContainerStyle = {
  display: "flex", // Flexbox layout for even distribution
  justifyContent: "space-between", // Space between items
  gap: "15px", // Add gap between elements
  marginBottom: "30px", // Add margin at the bottom
};

// Card style for summary items (Income, Expense, Net Balance)
const summaryCardStyle = {
  flex: "1", // Each card takes equal space
  backgroundColor: "#f8f9fa", // Light gray background
  padding: "15px", // Add padding inside the card
  borderRadius: "8px", // Rounded corners
  textAlign: "center", // Center text
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for a slight elevation effect
  borderLeft: "5px solid #0077B6", // Blue left border for visual appeal
};

// Style for Total Income value
const incomeStyle = {
  color: "#2ECC71", // Green color for income
  fontSize: "20px", // Font size for value
  fontWeight: "bold", // Bold text
};

// Style for Total Expense value
const expenseStyle = {
  color: "#E74C3C", // Red color for expenses
  fontSize: "20px", // Font size for value
  fontWeight: "bold", // Bold text
};

// Logout button styling
const logoutButtonStyle = {
  backgroundColor: "#E63946", // Red background
  color: "white", // White text color
  padding: "10px 20px", // Padding inside the button
  border: "none", // No border
  borderRadius: "5px", // Rounded corners
  cursor: "pointer", // Pointer cursor on hover
  fontSize: "16px", // Font size for text
  transition: "0.3s", // Smooth transition for hover effect
};

// Hover effect for logout button
logoutButtonStyle[":hover"] = {
  backgroundColor: "#C0392B", // Darker red color on hover
};

export default DashboardPage; // Export the component for use in other files
