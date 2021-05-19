var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const catalogSchema = new mongoose.Schema({
  hotelName: String,
  menuIds: Array,
});

const Catalog = mongoose.model("Catalog", catalogSchema);
module.exports = Catalog;
