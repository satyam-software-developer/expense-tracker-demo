import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/dbConfig.js"; // Import sequelize instance
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Frontend Origin Setup (replace with your actual frontend URL)
const clientOrigin = process.env.CLIENT_URL || "http://localhost:3000";

// Middleware
app.use(
  cors({
    origin: clientOrigin, // Allow only frontend-originated requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/reports", reportRoutes);

// Error Handler
app.use(errorHandler);

// Default route for health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
sequelize
  .authenticate() // Improved from sync to authenticate, for safer DB connection check
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
