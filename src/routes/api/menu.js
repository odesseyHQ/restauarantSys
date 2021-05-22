var express = require("express");
var router = express.Router();
var Menu = require("../../models/Menu");
var errResponse = require("../../constant/ErrorData");
const [postSchema, patchSchema] = require("../../validation/menu");
const validator = require("../../middlewares/validator");

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 204,
  message: "Document modified",
};

router.get("/", (req, res) => {
  Menu.find((err, menuData) => {
    if (!err) {
      return res.status(200).json(menuData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.post("/", validator.validatePostBody(postSchema), (req, res) => {
  const menu = new Menu(req.body);
  menu.save((err) => {
    if (!err) {
      return res.status(201).json(success);
    } else {
      return errResponse.errorMessage(503, res);
    }
  });
});

router.delete("/", (req, res) => {
  Menu.deleteMany((err) => {
    if (err) {
      return errResponse.errorMessage(505, res);
    } else {
      return res.status(201).json({ message: "All documents deleted" });
    }
  });
});

router.get("/:menuId", (req, res) => {
  Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
    if (!err) {
      return res.status(200).json(menuData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.patch(
  "/:menuId",
  validator.validatePatchBody(patchSchema),
  (req, res) => {
    Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
      if (req.body.dishIds) {
        req.body.dishIds = menuData.dishIds.concat(req.body.dishIds);
      }
      Menu.updateOne({ _id: req.params.menuId }, req.body, (err) => {
        if (!err) {
          return res.status(204).json(modified);
        } else {
          return errResponse.errorMessage(503, res);
        }
      });
    });
  }
);

module.exports = router;
