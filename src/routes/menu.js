var express = require("express");
var router = express.Router();
var path = require("path");
var Menu = require(path.join(__dirname, "..", "models", "Menu.js"));

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 201,
  message: "Document modified",
};

router.post("/", (req, res) => {
  const menu = new Menu(req.body);
  menu.save((err) => {
    if (!err) {
      res.send(JSON.stringify(success));
    } else {
      res.send(err);
    }
  });
});

router.delete("/", (req, res) => {
  Menu.deleteMany((err) => {
    if (err) {
      res.send("Success");
    } else {
      res.send(err);
    }
  });
});

router.patch("/:menuId", (req, res) => {
  Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
    if (req.body.dishIds) {
      req.body.dishIds = menuData.dishIds.concat(req.body.dishIds);
    }
    Menu.updateOne({ _id: req.params.menuId }, req.body, (err) => {
      if (!err) {
        res.send(JSON.stringify(modified));
      } else {
        res.send(err);
      }
    });
  });
});

module.exports = router;