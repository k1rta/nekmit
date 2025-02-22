const express = require('express');
const path = require('path');
const cors = require('cors');

const admin = require("firebase-admin");
const fs = require("fs");

let serviceAccount;

// Check if running locally by looking for firebase-config.json
if (fs.existsSync("./firebase-config.json")) {
    console.log("✅ Using local firebase-config.json");
    serviceAccount = require("./firebase-config.json");
} else if (process.env.FIREBASE_CONFIG) {
    console.log("✅ Using Firebase config from environment variables");
    serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
    console.error("❌ ERROR: No Firebase credentials found! Set up FIREBASE_CONFIG.");
    process.exit(1);
}

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Detect if running inside GitHub Actions
const isCI = process.env.CI === "true"; 
const port = isCI ? 4000 : 3000; // Different port for GitHub Actions

// Pageview tracking API
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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});