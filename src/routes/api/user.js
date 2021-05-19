var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
var Rtoken = require("../../models/Rtoken");
var User = require("../../models/User");
var errResponse = require("../../constant/ErrorData");
const [createSchema, loginSchema] = require("../../validation/user");
const validateBody = require("../../middlewares/validator");

router.post("/", validateBody(createSchema), async (req, res) => {
  User.findOne({ mail: req.body.mail }, async (err, userData) => {
    if (userData) {
      return errResponse.errorMessage(404, res);
    }
  });
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    user.save((err) => {
      if (!err) {
        res.status(201).json({ messaage: "Document created successfully" });
      } else {
        errResponse.errorMessage(503, res);
      }
    });
  } catch {
    errResponse.errorMessage(412, res);
  }
});

router.post("/login", validateBody(loginSchema), async (req, res) => {
  User.findOne({ mail: req.body.mail }, async (err, user) => {
    if (user === null) {
      return errResponse.errorMessage(407, res);
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const userMail = req.body.mail;
        const user = { mail: userMail };
        const accessToken = auth.generateToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        const rtoken = new Rtoken({ refreshToken: refreshToken });
        rtoken.save();
        res.status(201).json({
          accesToken: accessToken,
          refreshToken: refreshToken,
          messaage: "Logged in",
        });
      } else {
        return errResponse.errorMessage(405, res);
      }
    } catch {
      return errResponse.errorMessage(503, res);
    }
  });
});

router.get("/", (req, res) => {
  errResponse.errorMessage(401, res);
});

router.post("/token", (req, res) => {
  if (req.body.token == null) {
    return errResponse.errorMessage(403, res);
  }
  Rtoken.findOne({ refreshToken: req.body.token }, (err, tokenData) => {
    if (tokenData == null) return errResponse.errorMessage(415, res);
    jwt.verify(
      tokenData.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return errResponse.errorMessage(414, res);
        const accessToken = auth.generateToken({ mail: user.mail });
        return res.status(201).json({ accessToken: accessToken });
      }
    );
  });
});

router.delete("/logout", (req, res) => {
  Rtoken.findOne({ refreshToken: req.body.token }, (err, tokenData) => {
    if (tokenData == null) {
      return errResponse.errorMessage(414, res);
    } else {
      Rtoken.deleteOne({ refreshToken: req.body.token }, (err) => {
        if (!err) {
          return res
            .status(204)
            .json({ message: "Token deleted successfully" });
        } else {
          return errResponse.errorMessage(505, res);
        }
      });
    }
  });
});

module.exports = router;
