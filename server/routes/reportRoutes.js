import express from "express";
import { generateExpenseReport } from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Secure route with verifyToken middleware

const router = express.Router();

/**
 * @route   GET /api/reports/export-pdf
 * @desc    Generate and download expense report as PDF
 * @access  Private (requires JWT)
 */
router.get("/export-pdf", verifyToken, generateExpenseReport); // Protect route with token verification

export default router;
