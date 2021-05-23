var jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10mins",
  });
  return accessToken;
}

module.exports = generateToken;
