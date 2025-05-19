const sendSuccessResponse = (res, message, data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  })
}

const sendErrorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  })
}

module.exports = { sendSuccessResponse, sendErrorResponse }
