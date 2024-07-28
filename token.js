const jwt = require('jsonwebtoken');

const SECRET_KEY = '8eb3010d717a9689df16a166f91f52728b4db10474a5ecde'; // Replace with your actual secret key

function createToken(data) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: '24h' });
}

const token = createToken({ userId: 123 });
console.log(token);
