import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @desc Middleware to verify JWT authentication token
 * @usage Protects routes by validating JWT token in the Authorization header
 */
export const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    // Extract the token part
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to request

    next(); // Proceed to next middleware or route
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
