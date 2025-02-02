import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generate and download a PDF report for user expenses.
 * @param {Array} expenses - Array of expense objects.
 * @param {String} userName - Name of the user.
 */
const generatePDF = (expenses, userName) => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(18);
  doc.text("Expense Report", 14, 20);

  // User Name
  doc.setFontSize(12);
  doc.text(`User: ${userName}`, 14, 30);

  // Format the expense data into rows for the table
  const headers = ["Date", "Amount", "Category", "Description"];
  const rows = expenses.map((expense) => [
    new Date(expense.created_at).toLocaleDateString(), // Format date
    `$${expense.amount.toFixed(2)}`, // Format amount
    expense.category,
    expense.description || "N/A",
  ]);

  // Draw the table with the expense data
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 40,
    margin: { top: 20, left: 14, right: 14 },
  });

  // Calculate total Income and Expense
  const totalIncome = expenses
    .filter((expense) => expense.category === "Income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.category === "Expense")
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Add the summary for Income and Expense
  const summaryY = doc.lastAutoTable.finalY + 10; // Y position after the table
  doc.setFontSize(12);
  doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, summaryY);
  doc.text(`Total Expense: $${totalExpense.toFixed(2)}`, 14, summaryY + 10);

  // Save the PDF document with a dynamic filename
  doc.save(`expense_report_${new Date().toISOString()}.pdf`);
};

export default generatePDF;
