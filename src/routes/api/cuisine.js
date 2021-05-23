var express = require("express");
var router = express.Router();
var Cuisine = require("../../models/Cuisine");
const errorResponse = require("../../helpers/errorResponse");
const authenticator = require("../../middlewares/authenticator");
const [postSchema, patchSchema] = require("../../validation/cuisine");
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
    Cuisine.find((err, cuisineData) => {
      if (!err) {
        return res.status(201).json(cuisineData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .post(validator.validatePostBody(postSchema), (req, res) => {
    const cuisine = new Cuisine(req.body);
    cuisine.save((err) => {
      if (!err) {
        return res.status(201).json(success);
      } else {
        return errorResponse(503, res);
      }
    });
  })

  .delete((req, res) => {
    Cuisine.deleteMany((err) => {
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
  .route("/:cuisineId")
  .get((req, res) => {
    Cuisine.findOne({ _id: req.params.cuisineId }, (err, cuisineData) => {
      if (!err) {
        return res.status(200).json(cuisineData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .patch(validator.validatePatchBody(patchSchema), (req, res) => {
    Cuisine.updateOne({ _id: req.params.cuisineId }, req.body, (err) => {
      if (!err) {
        return res.status(201).json(modified);
      } else {
        return errorResponse(503, res);
      }
    });
  });

module.exports = router;
