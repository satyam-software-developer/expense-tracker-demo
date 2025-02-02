import bcrypt from "bcryptjs";
import db from "../config/dbConfig.js";
import { signToken } from "../config/jwtConfig.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const [users] = await db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = signToken(user.id);

    return res.status(200).json({
      message: "Login successful.",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc Get user profile (Protected)
 * @route GET /api/auth/profile
 * @access Private
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT middleware

    // Fetch user details
    const [users] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(users[0]);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
