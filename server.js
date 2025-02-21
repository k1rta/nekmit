const express = require('express');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin');

// Load Firebase service account credentials
require('dotenv').config();  // ✅ Load .env file

let serviceAccount;
try {
  if (process.env.FIREBASE_CONFIG) {
    serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

    if (!serviceAccount.private_key) {
      throw new Error('❌ private_key is missing from FIREBASE_CONFIG');
    }

    // Fix multiline private key issue (Ensure proper formatting)
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  } else {
    throw new Error('❌ FIREBASE_CONFIG is missing from .env');
  }
} catch (error) {
  console.error('❌ Error loading Firebase config:', error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    type: serviceAccount.type,
    project_id: serviceAccount.project_id,
    private_key_id: serviceAccount.private_key_id,
    private_key: serviceAccount.private_key.replace(/\\n/g, '\n'),  // ✅ FIX HERE
    client_email: serviceAccount.client_email,
    client_id: serviceAccount.client_id,
    auth_uri: serviceAccount.auth_uri,
    token_uri: serviceAccount.token_uri,
    auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
    client_x509_cert_url: serviceAccount.client_x509_cert_url,
    universe_domain: serviceAccount.universe_domain
  })
});

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
    const timestamp = new Date().toISOString();
    
    console.log(`📌 Pageview received at: ${timestamp}`);  // ✅ DEBUG LOG

    await db.collection('pageviews').add({ timestamp });

    console.log('✅ Pageview successfully recorded in Firebase'); // ✅ DEBUG LOG

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