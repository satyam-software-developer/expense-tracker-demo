import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Secure routes with JWT middleware

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private (requires JWT)
 */
router.get('/profile', verifyToken, getProfile);

export default router;

