const express = require('express')
const path = require('path')
const cors = require('cors')

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

// Page view tracking API (Logs to Firebase Firestore)
app.post('/api/page_view', async (req, res) => {
  const { page, environment } = req.body
  const timestamp = new Date() // Get current timestamp

  if (!page || !environment) {
    return res.status(400).json({ message: 'Missing required parameters' })
  }

  try {
    // Log the data being sent to Firestore
    console.log('📄 Data to be saved:', { page, environment, timestamp })

    // ✅ Ensure Firestore stores the timestamp properly
    const docRef = await db.collection('page_view_logs').add({
      page,
      environment,
      timestamp: admin.firestore.Timestamp.fromDate(timestamp), // ✅ Correct Firestore timestamp format
    })

    console.log(`✅ Page view saved: ${docRef.id}`)

    res.status(200).json({
      message: 'Page view recorded in Firebase',
      page,
      environment,
      timestamp: timestamp.toISOString(), // Send ISO string only in response, not in Firestore
    })
  } catch (error) {
    console.error('❌ Firestore Error:', error)
    res.status(500).json({ message: 'Failed to record page view' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
