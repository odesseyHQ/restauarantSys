var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

const dishSchema = new mongoose.Schema({
  cuisineId: { type: ObjectId, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  nonVeg: { type: Boolean, required: true },
  mainIngredient: { type: String, required: true },
  preprationTime: { type: Number, required: true },
  variants: Array,
});

var Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
