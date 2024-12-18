const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  TOKEN_SECRET = "secret"
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: "24h" });
}

module.exports = { generateAccessToken };
