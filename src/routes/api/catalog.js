var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var path = require("path");
var catalogs = require(path.join(
  __dirname,
  "..",
  "..",
  "models",
  "Catalog.js"
));
var Catalog = mongoose.model("Catalog");

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 201,
  message: "Document modified",
};

router.get("/", (req, res) => {
  Catalog.find((err, catalogData) => {
    if (!err) {
      res.send(catalogData);
    } else {
      res.send(err);
    }
  });
});

router.post("/", (req, res) => {
  const catalog = new Catalog(req.body);
  catalog.save((err) => {
    if (!err) {
      res.send(JSON.stringify(success));
    } else {
      res.send(err);
    }
  });
});

router.delete("/", (req, res) => {
  Catalog.deleteMany((err) => {
    if (err) {
      res.send("Success");
    } else {
      res.send(err);
    }
  });
});

router.get("/:catalogNumber", (req, res) => {
  Catalog.findOne({ _id: req.params.catalogId }, (err, catalogData) => {
    if (!err) {
      res.send(catalogData);
    } else {
      res.send(err);
    }
  });
});

router.patch("/:catalogNumber", (req, res) => {
  Catalog.findOne({ _id: req.params.catalogId }, (err, catalogData) => {
    if (req.body.menuIds) {
      req.body.menuIds = catalogData.menuIds.concat(req.body.menuIds);
    }
    Catalog.updateOne({ _id: req.params.catalogId }, req.body, (err) => {
      if (!err) {
        res.send(JSON.stringify(modified));
      } else {
        res.send(err);
      }
    });
  });
});

module.exports = router;
