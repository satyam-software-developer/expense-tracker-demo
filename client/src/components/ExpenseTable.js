import React from "react";

// Importing PropTypes to validate prop types
import PropTypes from 'prop-types';

const ExpenseTable = ({ expenses = [], onDelete }) => {
  // Calculate total income by filtering "Income" category and summing the amount
  const totalIncome = expenses
    .filter((expense) => expense.category === "Income")
    .reduce((total, expense) => total + expense.amount, 0);

  // Calculate total expenses by filtering "Expense" category and summing the amount
  const totalExpenses = expenses
    .filter((expense) => expense.category === "Expense")
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <h2>Expense List</h2>
      {/* Summary section displaying total income, expenses, and net balance */}
      <div>
        <h3>Summary:</h3>
        <p>Total Income: ${totalIncome.toFixed(2)}</p> {/* Display formatted total income */}
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p> {/* Display formatted total expenses */}
        <p>Net Balance: ${(totalIncome - totalExpenses).toFixed(2)}</p> {/* Display net balance */}
      </div>
      
      {/* Table displaying each expense with amount, category, description, and actions */}
      <table>
        <thead>
          <tr>
            <th>Amount</th> {/* Column for the amount */}
            <th>Category</th> {/* Column for the category */}
            <th>Description</th> {/* Column for the description */}
            <th>Actions</th> {/* Column for the action buttons */}
          </tr>
        </thead>
        <tbody>
          {/* Mapping over expenses to render each expense in a row */}
          {expenses.map((expense) => (
            <tr key={expense.id}> {/* Unique key for each row */}
              <td>${expense.amount.toFixed(2)}</td> {/* Display formatted amount */}
              <td>{expense.category}</td> {/* Display category (Income or Expense) */}
              <td>{expense.description || "-"}</td> {/* Display description, or "-" if none */}
              <td>
                {/* Delete button that triggers onDelete function with expense id */}
                <button onClick={() => onDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Prop type validation for the ExpenseTable component
ExpenseTable.propTypes = {
  // expenses should be an array of objects, each containing id, amount, category, and optional description
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  
  // onDelete should be a function that takes an id as an argument
  onDelete: PropTypes.func.isRequired,
};

export default ExpenseTable;



