import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Ensure JWT_SECRET is set in the environment
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing environment variable: JWT_SECRET");
  process.exit(1); // Exit process if JWT secret is missing
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION || "1h"; // Default to 1 hour

/**
 * Generate a JWT token for a user
 * @param {string} userId - The user's unique identifier
 * @returns {string} JWT token
 */
export const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

/**
 * Middleware to verify JWT token for protected routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. Token required." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded; // Attach user data to request
    next(); // Proceed to next middleware
  });
};
