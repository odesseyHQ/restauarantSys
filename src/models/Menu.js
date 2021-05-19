var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const menuSchema = new mongoose.Schema({
  cuisineId: ObjectId,
  name: String,
  dishIds: Array,
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
