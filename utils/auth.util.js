const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: "24h" });
}

module.exports = { generateAccessToken };
