var jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10mins",
  });
  return accessToken;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return errResponse.errorMessage(403, res);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return errResponse.errorMessage(414, res);
    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };
