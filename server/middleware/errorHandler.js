const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // Determine status code (default to 500 if not provided)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error: err.stack }), // Show stack trace only in development
  });
};

// 404 Not Found Middleware
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `🚫 Route not found: ${req.originalUrl}`,
  });
};

export { errorHandler, notFoundHandler };
