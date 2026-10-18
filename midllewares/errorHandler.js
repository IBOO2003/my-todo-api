const errorHandler = (err, res, req, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode1 == 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "internal server error",
    stack: process.env.NODE_ENV === "production" ? "💥" : err.stack,
  });
};
module.exports = errorHandler;
