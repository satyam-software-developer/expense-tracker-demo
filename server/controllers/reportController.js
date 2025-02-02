import db from "../config/dbConfig.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * @desc Generate and export an expense report as a PDF
 * @route GET /api/expenses/export-pdf
 * @access Private
 */
export const generateExpenseReport = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user expenses
    const [expenses] = await db.query(
      "SELECT id, amount, category, description, created_at FROM expenses WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user." });
    }

    // Initialize PDF Document
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Expense Report", 14, 15);

    // Format Table Data
    const tableData = expenses.map((expense) => [
      expense.id,
      `$${expense.amount.toFixed(2)}`, // Format as currency
      expense.category,
      expense.description || "N/A",
      new Date(expense.created_at).toLocaleDateString(),
    ]);

    // Generate Table
    autoTable(doc, {
      startY: 25,
      head: [["ID", "Amount ($)", "Category", "Description", "Date"]],
      body: tableData,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [0, 121, 107],
        textColor: 255,
        fontStyle: "bold",
      }, // Dark green header
      columnStyles: { 1: { halign: "right" }, 4: { halign: "center" } }, // Align numbers and dates
    });

    // Generate PDF Buffer
    const fileName = `expense_report_${Date.now()}.pdf`;
    const pdfBuffer = doc.output("arraybuffer");

    // Set Response Headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    // Send PDF File
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("❌ Error generating expense report:", error);
    return res
      .status(500)
      .json({ message: "Server error while generating report." });
  }
};
