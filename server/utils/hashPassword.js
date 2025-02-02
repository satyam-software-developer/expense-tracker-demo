
import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 * @throws {Error} If an error occurs during hashing.
 */
const hashPassword = async (password) => {
  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string.");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password. Please try again later.");
  }
};

export default hashPassword;
