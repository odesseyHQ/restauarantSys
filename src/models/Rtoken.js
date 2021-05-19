var mongoose = require("mongoose");

const rtokenSchema = new mongoose.Schema({
  refreshToken: String,
});

const Rtoken = mongoose.model("Rtoken", rtokenSchema);
module.exports = Rtoken;
