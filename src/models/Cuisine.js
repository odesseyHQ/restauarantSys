var mongoose = require('mongoose')



var cuisineSchema = new mongoose.Schema({
    cuisineName: String,
  });

var Cuisine = mongoose.model('Cuisine',cuisineSchema)

module.exports = Cuisine;