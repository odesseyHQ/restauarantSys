var mongoose = require("mongoose");

var cuisineSchema = new mongoose.Schema({
  cuisineName: String,
});

const Cuisine = mongoose.model("Cuisine", cuisineSchema);
module.exports = Cuisine;
