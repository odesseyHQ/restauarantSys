var express = require("express");
var router = express.Router();
var path = require("path");
var mongoose = require("mongoose");
const { route } = require("./cuisine");
var users = require(path.join(__dirname, "..", "..", "models", "User"));
var User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
var rtokens = require(path.join(__dirname, "..", "..", "models", "Rtoken.js"));
var Rtoken = mongoose.model("Rtoken");

require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    user.save((err) => {
      if (!err) {
        res.status(201).json({ messaage: "Document created successfully" });
      } else {
        res.status(401).json({ messaage: "failed" });
      }
    });
  } catch {
    res.status(500).res.send();
  }
});

router.post("/login", async (req, res) => {
  User.findOne({ mail: req.body.mail }, async (err, user) => {
    if (user === null) {
      return res.status(400).json({ messaage: "Cannot find user" });
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const userMail = req.body.mail;
        const user = { mail: userMail };
        const accessToken = auth.generateToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        const rtoken = new Rtoken({ refreshToken: refreshToken });
        rtoken.save();
        res.status(200).json({
          accesToken: accessToken,
          refreshToken: refreshToken,
          messaage: "Logged in",
        });
      } else {
        res.status(401).json({ messaage: "Invalid password" });
      }
    } catch {
      res.status(500).send();
    }
  });
});

router.get("/", auth.authenticateToken, (req, res) => {
  res.send("Verfied");
});

router.post("/token", (req, res) => {
  if (req.body.token == null)
    return res.status(401).json({ message: "Token missing" });
  Rtoken.findOne({ refreshToken: req.body.token }, (err, tokenData) => {
    if (tokenData == null)
      return res.status(401).json({ message: "Token does not exist" });
    jwt.verify(
      tokenData.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return res.status(401).json({ message: "Token invalid" });
        const accessToken = auth.generateToken({ mail: user.mail });
        res.json({ accessToken: accessToken });
      }
    );
  });
});

router.delete("/logout", (req, res) => {
  Rtoken.findOne({ refreshToken: req.body.token }, (err, tokenData) => {
    if (tokenData == null) {
      return res.status(401).json({ message: "Token does not exist" });
    } else {
      Rtoken.deleteOne({ refreshToken: req.body.token }, (err) => {
        return res.status(204).json({ message: "Deletd" });
      });
    }
  });
});

module.exports = router;
