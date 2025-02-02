import { DataTypes } from "sequelize";
import db from "../config/dbConfig.js";
import User from "./user.js"; // Ensure User model is imported correctly

const Expense = db.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference User model
        key: "id",
      },
      onDelete: "CASCADE", // Delete expenses when user is deleted
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0.01, // Ensures positive non-zero values
      },
    },
    category: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
      validate: {
        isIn: [["Income", "Expense"]], // Restricts values to these options
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "expenses",
    timestamps: true, // Auto-creates `createdAt` & `updatedAt`
    underscored: true, // Uses snake_case column names (`created_at`, `updated_at`)
  }
);

// Define Association: Expense belongs to User
Expense.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

export default Expense;
