var express = require("express");
var router = express.Router();
var Dish = require("../../models/Dish");
const authenticator = require("../../middlewares/authenticator");
const errorResponse = require("../../helpers/errorResponse");
const [postSchema, patchSchema] = require("../../validation/dish");
const validator = require("../../middlewares/validator");

var success = {
  status: 201,
  message: "Document created",
};

var modified = {
  status: 201,
  message: "Document modified",
};

router
  .route("/")
  .get((req, res) => {
    Dish.find((err, dishData) => {
      if (!err) {
        return res.status(200).json(dishData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .post(validator.validatePostBody(postSchema), (req, res) => {
    const dish = new Dish(req.body);
    dish.save((err) => {
      if (!err) {
        return res.status(201).json(success);
      } else {
        return errorResponse(503, res);
      }
    });
  })

  .delete((req, res) => {
    Dish.deleteMany((err) => {
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
  .route("/:dishId")
  .get((req, res) => {
    Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
      if (!err) {
        return res.status(200).json(dishData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .patch(validator.validatePatchBody(patchSchema), (req, res) => {
    Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
      if (req.body.variants) {
        req.body.variants = dishData.variants.concat(req.body.variants);
      }
      Dish.updateOne({ _id: req.params.dishId }, req.body, (err) => {
        if (!err) {
          return res.status(204).json(modified);
        } else {
          return errorResponse(503, res);
        }
      });
    });
  });

module.exports = router;
