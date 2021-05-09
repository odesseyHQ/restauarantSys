var express = require("express");
var router = express.Router();
var path = require("path");
var mongoose = require("mongoose");
var cuisines = require(path.join(__dirname, "..", "models", "Cuisine.js"));
var Cuisine = mongoose.model("Cuisine");

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 201,
  message: "Document modified",
};

router.post("/", (req, res) => {
  const cuisine = new Cuisine(req.body);
  cuisine.save((err) => {
    if (!err) {
      res.send(JSON.stringify(success));
    } else {
      res.send(err);
    }
  });
});

router.delete("/", (req, res) => {
  Cuisine.deleteMany((err) => {
    if (err) {
      res.send("Success");
    } else {
      res.send(err);
    }
  });
});

router.patch("/:cuisineId", (req, res) => {
  Cuisine.updateOne({ _id: req.params.cuisineId }, req.body, (err) => {
    if (!err) {
      res.send(JSON.stringify(modified));
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
