var express = require("express");
var router = express.Router();
var Menu = require("../../models/Menu");
const authenticator = require("../../middlewares/authenticator");
const errorResponse = require("../../helpers/errorResponse");
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

router
  .route("/")
  .get((req, res) => {
    Menu.find((err, menuData) => {
      if (!err) {
        return res.status(200).json(menuData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .post(validator.validatePostBody(postSchema), (req, res) => {
    const menu = new Menu(req.body);
    menu.save((err) => {
      if (!err) {
        return res.status(201).json(success);
      } else {
        return errorResponse(503, res);
      }
    });
  })

  .delete((req, res) => {
    Menu.deleteMany((err) => {
      if (err) {
        return errorResponse(505, res);
      } else {
        return res
          .status(204)
          .json({ success: true, message: "All documents deleted" });
      }
    });
  });

router
  .route("/:menuId")
  .get((req, res) => {
    Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
      if (!err) {
        return res.status(200).json(menuData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .patch(validator.validatePatchBody(patchSchema), (req, res) => {
    Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
      if (req.body.dishIds) {
        req.body.dishIds = menuData.dishIds.concat(req.body.dishIds);
      }
      Menu.updateOne({ _id: req.params.menuId }, req.body, (err) => {
        if (!err) {
          return res.status(204).json(modified);
        } else {
          return errorResponse(503, res);
        }
      });
    });
  });

module.exports = router;
