var express = require("express");
var router = express.Router();
var Cuisine = require("../../models/Cuisine");
var errResponse = require("../../constant/ErrorData");
const auth = require("../../middlewares/authenticator");
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

router.get("/", (req, res) => {
  Cuisine.find((err, cuisineData) => {
    if (!err) {
      return res.status(201).json(cuisineData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.post("/", validator.validatePostBody(postSchema), (req, res) => {
  const cuisine = new Cuisine(req.body);
  cuisine.save((err) => {
    if (!err) {
      return res.status(201).json(success);
    } else {
      return errResponse.errorMessage(503, res);
    }
  });
});

router.delete("/", (req, res) => {
  Cuisine.deleteMany((err) => {
    if (err) {
      return errResponse.errorMessage(505, res);
    } else {
      return res.send("scuucess");
    }
  });
});

router.get("/:cuisineId", (req, res) => {
  Cuisine.findOne({ _id: req.params.cuisineId }, (err, cuisineData) => {
    if (!err) {
      return res.status(200).json(cuisineData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.patch(
  "/:cuisineId",
  validator.validatePatchBody(patchSchema),
  (req, res) => {
    Cuisine.updateOne({ _id: req.params.cuisineId }, req.body, (err) => {
      if (!err) {
        return res.status(201).json(modified);
      } else {
        return errResponse.errorMessage(503, res);
      }
    });
  }
);

module.exports = router;
