const express = require('express')
const path = require('path')
const cors = require('cors')
const { body, validationResult } = require('express-validator')
const errorHandler = require('./errorHandler')
const logger = require('./utils/logger')
const { sendSuccessResponse, sendErrorResponse } = require('./utils/responseHelper')
const { getCurrentTimestamp, getEnvironment } = require('./utils/helpers')

// ✅ Load Firebase credentials from JSON
const admin = require('firebase-admin')
const fs = require('fs') // File system to check if local config exists

let serviceAccount

// Check if running locally by looking for firebase-config.json
if (fs.existsSync('./firebase-config.json')) {
  console.log('✅ Using local firebase-config.json')
  serviceAccount = require('./firebase-config.json')
} else if (process.env.FIREBASE_CONFIG) {
  console.log('✅ Using Firebase config from environment variables')
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)
} else {
  console.error('❌ ERROR: No Firebase credentials found! Set up FIREBASE_CONFIG in Render.')
  process.exit(1)
}

// Initialize Firebase
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  console.log('✅ Firebase initialized successfully.')
} catch (error) {
  console.error('❌ Firebase initialization failed:', error)
}

const db = admin.firestore()

const app = express()
const port = process.env.PORT || 3000

// Enable CORS for development
app.use(cors())
app.use(express.json())

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Page View API with validation middleware remains unchanged above...
app.post(
  '/api/page_view',
  [
    body('page').notEmpty().withMessage('Page is required'),
    body('environment').notEmpty().withMessage('Environment is required'),
  ],
  async (req, res, next) => {
    const { page, environment } = req.body
    const currentTimestamp = getCurrentTimestamp()
    const env = environment || getEnvironment()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, 'Validation Error', errors.array())
    }

    try {
      sendSuccessResponse(res, 'Page view recorded', { page, environment: env })
      logger.info('Page view recorded', { page, environment: env, timestamp: currentTimestamp })
    } catch (error) {
      next(error)
    }
  }
)

// Icon Click API with validation middleware
app.post(
  '/api/icon_click',
  [
    body('icon').notEmpty().withMessage('Icon is required'),
    body('environment').notEmpty().withMessage('Environment is required'),
  ],
  async (req, res, next) => {
    const { icon, environment, timestamp } = req.body
    const currentTimestamp = getCurrentTimestamp()
    const env = environment || getEnvironment()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, 'Validation Error', errors.array())
    }

    try {
      // Firestore logging logic...
      sendSuccessResponse(res, 'Icon click recorded', { icon, environment: env })
      logger.info('Icon click recorded', { icon, environment: env, timestamp: currentTimestamp })
    } catch (error) {
      next(error)
    }
  }
)

// Register the global error handler after all routes
app.use(errorHandler)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
