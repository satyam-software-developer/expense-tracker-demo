import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Ensure required environment variables are set
const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1); // Exit process if any required variable is missing
  }
});

// Create Sequelize instance for MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // MySQL host (e.g., localhost or remote IP)
    port: Number(process.env.DB_PORT) || 3306, // Default MySQL port
    dialect: "mysql", // Specify MySQL dialect
    pool: {
      max: 5, // Max connections in pool
      min: 0, // Min connections in pool
      acquire: 30000, // Max time (ms) to get connection before throwing error
      idle: 10000, // Max time (ms) before releasing an idle connection
    },
    logging: process.env.DB_LOGGING === "true" ? console.log : false, // Toggle query logging
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// Run connection test when this file is loaded
testConnection();

// Export the Sequelize instance for use in models and queries
export default sequelize;
