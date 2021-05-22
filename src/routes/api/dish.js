var express = require("express");
var router = express.Router();
var Dish = require("../../models/Dish");
var errResponse = require("../../constant/ErrorData");
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

router.get("/", (req, res) => {
  Dish.find((err, dishData) => {
    if (!err) {
      return res.status(200).json(dishData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.post("/", validator.validatePostBody(postSchema), (req, res) => {
  const dish = new Dish(req.body);
  dish.save((err) => {
    if (!err) {
      return res.status(201).json(success);
    } else {
      return errResponse.errorMessage(503, res);
    }
  });
});

router.delete("/", (req, res) => {
  Dish.deleteMany((err) => {
    if (err) {
      return errResponse.errorMessage(505, res);
    } else {
      return res.send("scuucess");
    }
  });
});

router.get("/:dishId", (req, res) => {
  Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
    if (!err) {
      return res.status(200).json(dishData);
    } else {
      return errResponse.errorMessage(501, res);
    }
  });
});

router.patch(
  "/:dishId",
  validator.validatePatchBody(patchSchema),
  (req, res) => {
    // Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
    //   if (req.body.variants) {
    //     req.body.variants = dishData.variants.concat(req.body.variants);
    //   }
    //   Dish.updateOne({ _id: req.params.dishId }, req.body, (err) => {
    //     if (!err) {
    //       return res.status(204).json(modified);
    //     } else {
    //       return errResponse.errorMessage(503, res);
    //     }
    //   });
    // });
  }
);

module.exports = router;
