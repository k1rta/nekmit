const getCurrentTimestamp = () => new Date().toISOString()

const getEnvironment = () => {
  return process.env.NODE_ENV === 'development' ? 'localhost' : 'production'
}

module.exports = { getCurrentTimestamp, getEnvironment }
