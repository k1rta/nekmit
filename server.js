const express = require('express');
const path = require('path');
const cors = require('cors');

// ✅ Load Firebase credentials from JSON
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json");  // Direct file reference

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Check if Firebase is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// ✅ Firestore Database
const db = admin.firestore();

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