const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from "public" directory with correct URL structure
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Serve index.html from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});