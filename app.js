const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/RestaurantDB-2", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(require("./src/routes"));

app.listen(4000, () => {
  console.log("Server running on 4000");
});
