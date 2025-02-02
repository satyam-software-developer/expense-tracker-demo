import { DataTypes } from "sequelize";
import db from "../config/dbConfig.js";
import bcrypt from "bcryptjs";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures name is not empty
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures a valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100], // Ensures password is at least 6 characters
      },
    },
  },
  {
    tableName: "users",
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
    underscored: true, // Uses snake_case for database columns
  }
);

// Hash password before saving a new user
User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

// Hash password before updating an existing user (if changed)
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await hashPassword(user.password);
  }
});

// Helper function for password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default User;
