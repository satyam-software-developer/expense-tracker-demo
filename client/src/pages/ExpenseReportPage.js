import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import authentication context
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import for table support in jsPDF
import ExpenseTable from "../components/ExpenseTable"; // Import the ExpenseTable component

const ExpenseReportPage = () => {
  const { user } = useAuth(); // Get user authentication data
  const navigate = useNavigate(); // Initialize navigation function
  const [expenses, setExpenses] = useState([]); // State to store expense data
  const [totalIncome, setTotalIncome] = useState(0); // State for total income
  const [totalExpense, setTotalExpense] = useState(0); // State for total expenses

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!user) {
      navigate("/login");
      return;
    }

    // Mock data (replace this with an API call in a real application)
    const fetchedExpenses = [
      { id: 1, amount: 500, category: "Income", description: "Salary" },
      { id: 2, amount: 200, category: "Expense", description: "Groceries" },
      { id: 3, amount: 100, category: "Expense", description: "Utilities" },
    ];

    setExpenses(fetchedExpenses); // Update state with fetched expenses

    // Calculate total income
    const income = fetchedExpenses
      .filter((expense) => expense.category === "Income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate total expenses
    const expense = fetchedExpenses
      .filter((expense) => expense.category === "Expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(income); // Update total income state
    setTotalExpense(expense); // Update total expense state
  }, [user, navigate]); // Effect runs when user or navigation changes

  // Calculate net balance (Income - Expenses)
  const netBalance = totalIncome - totalExpense;

  // **Export Expense Report to PDF**
  const exportToPDF = () => {
    const doc = new jsPDF(); // Initialize jsPDF instance

    // Set report title
    doc.setFontSize(18);
    doc.text("Expense Report", 14, 20);

    // Add summary details
    doc.setFontSize(12);
    doc.text(`Total Income: $${totalIncome}`, 14, 30);
    doc.text(`Total Expenses: $${totalExpense}`, 14, 40);
    doc.text(`Net Balance: $${netBalance}`, 14, 50);

    // Define table headers
    const headers = [["ID", "Amount ($)", "Category", "Description"]];

    // Map expense data to match table format
    const data = expenses.map((expense) => [
      expense.id,
      expense.amount,
      expense.category,
      expense.description || "N/A", // Default to "N/A" if description is missing
    ]);

    // Generate table using autoTable plugin
    doc.autoTable({
      startY: 60, // Set Y position for table
      head: headers,
      body: data,
    });

    // Save PDF file
    doc.save("expense_report.pdf");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Expense Report</h1>

      {/* Summary Section */}
      <div style={summaryContainerStyle}>
        <div style={summaryCardStyle}>
          <h2>Total Income</h2>
          <p style={incomeStyle}>${totalIncome}</p>
        </div>
        <div style={summaryCardStyle}>
          <h2>Total Expenses</h2>
          <p style={expenseStyle}>${totalExpense}</p>
        </div>
        <div
          style={{
            ...summaryCardStyle,
            borderColor: netBalance >= 0 ? "#2ECC71" : "#E74C3C", // Change border color based on balance
          }}
        >
          <h2>Net Balance</h2>
          <p
            style={{
              color: netBalance >= 0 ? "#2ECC71" : "#E74C3C", // Green if positive, red if negative
              fontWeight: "bold",
            }}
          >
            ${netBalance}
          </p>
        </div>
      </div>

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />

      {/* Button to Export Report */}
      <button onClick={exportToPDF} style={exportButtonStyle}>
        Export to PDF
      </button>
    </div>
  );
};

// **Styled Components** (Inline styles for UI styling)
const containerStyle = {
  maxWidth: "800px",
  margin: "auto",
  padding: "20px",
  textAlign: "center",
};

const headerStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

const summaryContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginBottom: "30px",
};

const summaryCardStyle = {
  flex: "1",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderLeft: "5px solid #0077B6", // Left border color for emphasis
};

const incomeStyle = {
  color: "#2ECC71", // Green for income
  fontSize: "20px",
  fontWeight: "bold",
};

const expenseStyle = {
  color: "#E74C3C", // Red for expenses
  fontSize: "20px",
  fontWeight: "bold",
};

const exportButtonStyle = {
  backgroundColor: "#28a745", // Green color for button
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.3s",
};

// Hover Effect (Not applicable in inline styles, but works in styled-components)
exportButtonStyle[":hover"] = {
  backgroundColor: "#218838",
};

export default ExpenseReportPage;
