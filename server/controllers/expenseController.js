import db from "../config/dbConfig.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * @desc Add a new expense
 * @route POST /api/expenses
 * @access Private
 */
export const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided." });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }

    // Insert expense into database
    await db.query(
      "INSERT INTO expenses (user_id, amount, category, description) VALUES (?, ?, ?, ?)",
      [userId, amount, category, description || null]
    );

    return res.status(201).json({ message: "Expense added successfully." });
  } catch (error) {
    console.error("❌ Add Expense Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc Delete an expense
 * @route DELETE /api/expenses/:id
 * @access Private
 */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if expense exists and belongs to the user
    const [expenses] = await db.query(
      "SELECT id FROM expenses WHERE id = ? AND user_id = ? LIMIT 1",
      [id, userId]
    );

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized." });
    }

    // Delete expense
    await db.query("DELETE FROM expenses WHERE id = ?", [id]);

    return res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    console.error("❌ Delete Expense Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc List all expenses for the user
 * @route GET /api/expenses
 * @access Private
 */
export const listExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [expenses] = await db.query(
      "SELECT id, amount, category, description, created_at FROM expenses WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    // Calculate total income and expenses
    let totalIncome = 0;
    let totalExpenses = 0;

    expenses.forEach((expense) => {
      if (expense.category.toLowerCase() === "income") {
        totalIncome += expense.amount;
      } else {
        totalExpenses += expense.amount;
      }
    });

    return res.status(200).json({ expenses, totalIncome, totalExpenses });
  } catch (error) {
    console.error("❌ List Expenses Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc Export expenses as a PDF
 * @route GET /api/expenses/export-pdf
 * @access Private
 */
export const exportExpensesToPDF = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [expenses] = await db.query(
      "SELECT id, amount, category, description, created_at FROM expenses WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Expense Report", 14, 15);

    // Generate table
    autoTable(doc, {
      startY: 25,
      head: [["ID", "Amount ($)", "Category", "Description", "Date"]],
      body: expenses.map((expense) => [
        expense.id,
        expense.amount.toFixed(2),
        expense.category,
        expense.description || "N/A",
        new Date(expense.created_at).toLocaleDateString(),
      ]),
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [0, 121, 107] }, // Dark green header
    });

    // Generate PDF file
    const fileName = `expense_report_${Date.now()}.pdf`;
    const pdfBuffer = doc.output("arraybuffer");

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("❌ Export PDF Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
