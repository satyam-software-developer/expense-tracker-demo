import express from 'express';
import { addExpense, deleteExpense, listExpenses } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Secure routes with verifyToken middleware

const router = express.Router();

/**
 * @route   POST /api/expenses/add
 * @desc    Add a new expense
 * @access  Private (requires JWT)
 */
router.post('/add', verifyToken, addExpense);

/**
 * @route   DELETE /api/expenses/delete/:id
 * @desc    Delete an expense by ID
 * @access  Private (requires JWT)
 */
router.delete('/delete/:id', verifyToken, deleteExpense);

/**
 * @route   GET /api/expenses/list
 * @desc    List all expenses for the authenticated user
 * @access  Private (requires JWT)
 */
router.get('/list', verifyToken, listExpenses);

export default router;
