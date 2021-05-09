var mongoose = require("mongoose");

var cuisineSchema = new mongoose.Schema({
  cuisineName: String,
});

mongoose.model("Cuisine", cuisineSchema);
