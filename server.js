const express = require('express');
const path = require('path');
const cors = require('cors');

// ✅ Load Firebase credentials from JSON
const admin = require("firebase-admin");
const fs = require("fs"); // File system to check if local config exists

let serviceAccount;

// Check if running locally by looking for firebase-config.json
if (fs.existsSync("./firebase-config.json")) {
    console.log("✅ Using local firebase-config.json");
    serviceAccount = require("./firebase-config.json");
} else if (process.env.FIREBASE_CONFIG) {
    console.log("✅ Using Firebase config from environment variables");
    serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
    console.error("❌ ERROR: No Firebase credentials found! Set up FIREBASE_CONFIG in Render.");
    process.exit(1);
}

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ Check if Firebase is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for development
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Pageview tracking API (Logs to Firebase Firestore)
app.post('/api/pageview', async (req, res) => {
  try {
    const { page, environment } = req.body;
    const timestamp = new Date().toISOString();
    
    console.log(`📌 Pageview received at: ${timestamp} from ${environment}`);

    await db.collection('pageviews').add({ 
      timestamp, 
      page, 
      environment 
    });

    console.log('✅ Pageview successfully recorded in Firebase');

    res.json({ message: 'Pageview recorded in Firebase' });
  } catch (error) {
    console.error('❌ Error logging pageview:', error);
    res.status(500).json({ message: 'Failed to log pageview' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});