const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = '8eb3010d717a9689df16a166f91f52728b4db10474a5ecde';
const affiliateLinks = [
  'https://stake.com/?c=Yh63e0CV',
  'https://t.ajrkm3.com/328984/6224/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN',
  'https://t.ajrkm.link/328984/3688/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN',
  'https://t.ajrkm.link/328984/6516/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN',
  'https://t.ajrkm.link/328984/7758/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN',
  'https://t.ajrkm.link/328984/5230/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN',
  'https://t.ajrkm.link/328984/7683/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN'
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
    console.error('Invalid token:', err);
    return res.status(400).send('Invalid token');
  }
}

// Redirect the main domain to Google
app.get('/', (req, res) => {
  res.redirect('https://www.google.com');
});

// Endpoint to handle the redirection functionality
app.get('/api/users', parseToken, (req, res) => {
  const randomLink = affiliateLinks[Math.floor(Math.random() * affiliateLinks.length)];
  res.redirect(randomLink);
});

// Function to create token
function createToken(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: '24h' });
}

// Endpoint to generate token and redirect
app.get('/kkt4pmb', (req, res) => {
  const token = createToken({ userId: 123 });
  const redirectUrl = `/n4vk1wub0?key=${token}`;
  res.redirect(redirectUrl);
});

// Endpoint to verify token and send file
app.get('/n4vk1wub0', (req, res) => {
  const token = req.query.key;
  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    jwt.verify(token, SECRET_KEY);
    res.sendFile(path.join(__dirname, 'first.html'));
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(400).send('Invalid token');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
