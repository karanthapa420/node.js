const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: '8eb3010d717a9689df16a166f91f52728b4db10474a5ecde', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Function to generate a random token
const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Middleware to set the token in the session
app.use((req, res, next) => {
  if (!req.session.token) {
    const token = generateToken();
    req.session.token = token;
  }
  next();
});

// Route to serve the form
app.get('/form', (req, res) => {
  const token = req.session.token;
  res.send(`
    <form action="/submit" method="POST">
      <input type="hidden" name="token" value="${token}" />
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const formToken = req.body.token;
  const sessionToken = req.session.token;

  if (formToken && formToken === sessionToken) {
    res.send('Form submission successful!');
  } else {
    res.status(403).send('Invalid form submission');
  }
});

// Route to get the token (for use in another server.js file or part of the app)
app.get('/get-token', (req, res) => {
  const token = req.session.token;
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const axios = require('axios');

axios.get('http://localhost:3000/get-token')
  .then(response => {
    const token = response.data.token;
    console.log('Token:', token);
    // Use the token as needed in your other server file
  })
  .catch(error => {
    console.error('Error fetching token:', error);
  });