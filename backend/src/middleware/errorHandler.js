function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    error: {
      message:
        statusCode === 500 ? "Internal server error" : error.message,
      statusCode
    }
  });
}

module.exports = errorHandler;
