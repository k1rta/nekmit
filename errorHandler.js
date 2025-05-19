const logger = require('./utils/logger')

module.exports = (err, req, res, next) => {
  logger.error('Error:', err)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : null,
    timestamp: new Date().toISOString(),
  })
}
