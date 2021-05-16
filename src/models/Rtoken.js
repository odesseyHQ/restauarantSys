var mongoose = require("mongoose");

const rtokenSchema = new mongoose.Schema({
  refreshToken: String,
});

mongoose.model("Rtoken", rtokenSchema);
