import axios from "axios"; // Import Axios for making HTTP requests

// Get the API base URL from the .env file (defaults to localhost if not set)
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL, // Set the base URL for all API requests
  headers: {
    "Content-Type": "application/json", // Specify that requests will be in JSON format
  },
});

// Helper function to handle API responses and return the data
const handleResponse = (response) => response.data;

// Helper function to handle API errors and throw a formatted error message
const handleError = (error) => {
  throw new Error(
    error.response?.data?.message || error.message || "An error occurred"
  );
};

/**
 * Function to register a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - The registered user's data
 */
export const registerUser = async (email, password) => {
  try {
    const response = await api.post("/register", { email, password }); // Send POST request to register
    return handleResponse(response); // Return API response data
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};

/**
 * Function to log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - The logged-in user's data (including token)
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password }); // Send POST request to log in
    return handleResponse(response); // Return API response data
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};

/**
 * Function to fetch all expenses
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} - List of expenses
 */
export const fetchExpenses = async (token) => {
  try {
    const response = await api.get("/expenses", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the authentication token in headers
      },
    });
    return handleResponse(response); // Return API response data
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};

/**
 * Function to add a new expense
 * @param {Object} expenseData - Expense details (amount, category, etc.)
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - The newly added expense data
 */
export const addExpense = async (expenseData, token) => {
  try {
    const response = await api.post("/expenses", expenseData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass authentication token
      },
    });
    return handleResponse(response); // Return API response data
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};

/**
 * Function to delete an expense
 * @param {string} expenseId - The ID of the expense to delete
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - The deleted expense confirmation
 */
export const deleteExpense = async (expenseId, token) => {
  try {
    const response = await api.delete(`/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass authentication token
      },
    });
    return handleResponse(response); // Return API response data
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};

/**
 * Function to export expenses as a PDF file
 * @param {string} token - Authentication token
 */
export const exportExpensesToPDF = async (token) => {
  try {
    const response = await api.get("/expenses/export", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass authentication token
      },
      responseType: "blob", // Expect binary data (PDF file)
    });

    // Create a URL from the response data to enable file download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expense_report.pdf"); // Set the file name
    document.body.appendChild(link);
    link.click(); // Trigger download
    document.body.removeChild(link); // Cleanup: remove link after download
  } catch (error) {
    handleError(error); // Handle and throw the error
  }
};
