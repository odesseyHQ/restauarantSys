var express = require("express");
var router = express.Router();
var Catalog = require("../../models/Catalog");
const errorResponse = require("../../helpers/errorResponse");
const [postSchema, patchSchema] = require("../../validation/catalog");
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
    Catalog.find((err, catalogData) => {
      if (!err) {
        return res.status(200).json(catalogData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .post(validator.validatePostBody(postSchema), (req, res) => {
    const catalog = new Catalog(req.body);
    catalog.save((err) => {
      if (!err) {
        return res.status(201).json(success);
      } else {
        return errorResponse(503, res);
      }
    });
  })

  .delete((req, res) => {
    Catalog.deleteMany((err) => {
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
  .route("/:catalogNumber")
  .get((req, res) => {
    Catalog.findOne({ _id: req.params.catalogId }, (err, catalogData) => {
      if (!err) {
        return res.status(200).json(catalogData);
      } else {
        return errorResponse(501, res);
      }
    });
  })

  .patch(validator.validatePatchBody(patchSchema), (req, res) => {
    Catalog.findOne({ _id: req.params.catalogId }, (err, catalogData) => {
      if (req.body.menuIds) {
        req.body.menuIds = catalogData.menuIds.concat(req.body.menuIds);
      }
      Catalog.updateOne({ _id: req.params.catalogId }, req.body, (err) => {
        if (!err) {
          return res.status(204).json(modified);
        } else {
          return errorResponse(503, res);
        }
      });
    });
  });

module.exports = router;
