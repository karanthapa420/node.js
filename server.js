const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = '8eb3010d717a9689df16a166f91f52728b4db10474a5ecde';
const affiliateLinks = [
  'https://gameinstants.com',
  'https://keepthetech.com',
  'https://meaninginhindi.org'
];

// Middleware to parse token
function parseToken(req, res, next) {
  const token = req.query.key || req.query.token;
  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
}

// Redirect endpoint (Second URL)
app.get('/api/users', parseToken, (req, res) => {
  const randomLink = affiliateLinks[Math.floor(Math.random() * affiliateLinks.length)];
  res.redirect(randomLink);
});

// Function to create token
function createToken(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: '24h' });
}

// Endpoint to generate URL with token (for testing or admin purposes)
app.get('/kktgst4pm', (req, res) => {
  const token = createToken({ userId: 123 });
  const fullUrl = `https://node-js-two-beryl.vercel.app/kktgst4pm?key=${token}`;
  
  // Redirect the user to the generated URL
  res.redirect(fullUrl);
});

// Serve the HTML for the first URL (First URL)
app.get('/n4vk1wub0', (req, res) => {
  const token = req.query.key;
  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    jwt.verify(token, SECRET_KEY);
    // Serve the HTML content that will redirect to the second URL
    res.sendFile(path.join(__dirname, 'first.html'));
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
