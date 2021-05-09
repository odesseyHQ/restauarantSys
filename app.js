const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Creating connection to Database 'RestauarantDB-2'
mongoose.connect("mongodb://localhost:27017/RestaurantDB-2", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const routes = require("./src/routes");
app.use(routes);

app.listen(4000, () => {
  console.log("Server running on 4000");
});
