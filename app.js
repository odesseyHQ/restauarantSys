const express = require("express");
const mongoose = require("mongoose");
const jsonParser = (...args) => {
  let parser = express.json();
  try {
    return parser(...args);
  } catch (err) {
    console.log(err);
  }
};
const app = express();
app.use(express.json());
// app.use(jsonParser);

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
