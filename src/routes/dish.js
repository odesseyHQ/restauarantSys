var express = require("express");
var router = express.Router();
var path = require("path");
var Dish = require(path.join(__dirname, "..", "models", "Dish.js"));

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 201,
  message: "Document modified",
};

router.post("/", (req, res) => {
  const dish = new Dish(req.body);
  dish.save((err) => {
    if (!err) {
      res.send(JSON.stringify(success));
    } else {
      res.send(err);
    }
  });
});

router.delete("/", (req, res) => {
  Dish.deleteMany((err) => {
    if (err) {
      res.send("Success");
    } else {
      res.send(err);
    }
  });
});

router.patch("/:dishId", (req, res) => {
  Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
    if (req.body.variants) {
      req.body.variants = dishData.variants.concat(req.body.variants);
    }
    Dish.updateOne({ _id: req.params.dishId }, req.body, (err) => {
      if (!err) {
        res.send(JSON.stringify(modified));
      } else {
        res.send(err);
      }
    });
  });
});

module.exports = router;
