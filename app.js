const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
// app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
var ObjectId = require("mongodb").ObjectId;

// Creating connection to Database 'RestauarantDB-2'
mongoose.connect("mongodb://localhost:27017/RestaurantDB-2", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Schematic for the collection of dishes
const dishSchema = {
  dishNumber: Number, // Added automatically when creating a new dish
  cuisineId: ObjectId,
  name: String,
  category: String,
  nonVeg: Boolean,
  mainIngredient: String,
  preprationTime: Number,
  variantCount: Number,
  variants: Array,
};

// Schematic for the collection of cuisines
const cuisineSchema = {
  cuisineNumber: Number, // Added automatically when creating a new cuisine
  cuisineName: String,
};

// Schematic for the collection of catalogs
const catalogSchema = {
  hotelName: String,
  catalogNumber: Number, // Added automatically when creating a new catalog
  menuIds: Array,
};

// Schematic for the collection of menus
const menuSchema = {
  menuNumber: Number, // Added automatically when creating a new menu
  cuisineId: ObjectId,
  name: String,
  dishIds: Array,
};
const Dish = mongoose.model("Dish", dishSchema); // Creating dishes collection
const Catalog = mongoose.model("Catalog", catalogSchema); // Creating catalogs collection
const Menu = mongoose.model("Menu", menuSchema); // Creating menus collection
const Cuisine = mongoose.model("Cuisine", cuisineSchema); // Creating cuisines collection

// ------------CUISINES------------------

// Create new cuisine
app.post("/cuisine", (req, res) => {
  console.log(req.body);
  const cuisine = new Cuisine(req.body); // Creating a new cuisine
  // cuisine.save((err) => {
  //   // Saving the cuisine
  //   if (!err) {
  //     res.send("success");
  //   } else {
  //     res.send("failed");
  //   }
  // });
});

// Delete all cuisines in the collection
app.delete("/cuisine", (req, res) => {
  Cuisine.deleteMany((err) => {
    // Deleting all documents
    if (err) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  });
});

// Edit an exsiting cuisine
app.patch("/cuisine/:cuisineId", (req, res) => {
  Cuisine.updateOne({ _id: req.params.cuisineId }, req.body, (err) => {
    if (!err) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
});

// ----------DISHES-----------

// Create new dish
app.post("/dish", (req, res) => {
  const dish = new Dish(req.body); // Creating new dish
  dish.save((err) => {
    // Saving the dish
    if (!err) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
});

// Delete all dishes in the collection
app.delete("/dish", (req, res) => {
  Dish.deleteMany((err) => {
    // Deleting all documents
    if (err) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  });
});

// Edit an existing dish
app.patch("/dish/:dishId", (req, res) => {
  console.log(req.body);
  if (req.body.variants) {
    Dish.findOne({ _id: req.params.dishId }, (err, dishData) => {
      // Fetching data of the dish corresponding to the dish number specified
      req.body.variants = dishData.variants.concat(req.body.variants);
      console.log(req.body);
    });
  }
  Dish.updateOne({ _id: req.params.dishId }, req.body, (err) => {
    // Updating the data of the concerened dish
    console.log(req.body);
    if (!err) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
});

// ------------MENUS---------

// Create new menu
app.post("/menu", (req, res) => {
  const menu = new Menu(req.body); // Creating new menu
  menu.save((err) => {
    // Saving the menu
    if (!err) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
});

// Delete all menus in the collection
app.delete("/menu", (req, res) => {
  Menu.deleteMany((err) => {
    // Deleting all documents
    if (err) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  });
});

// Edit an existing menu
app.patch("/menu/:menuId", (req, res) => {
  if (req.body.dishIds) {
    Menu.findOne({ _id: req.params.menuId }, (err, menuData) => {
      // Fetching data of the menu corresponding to the menu number specified
      req.body.dishIds = menuData.dishIds.concat(req.body.dishIds); // Adding the ObjectIds of the new dishes to the existing array of ObjectIds
    });
  }
  Menu.updateOne({ _id: req.params.menuId }, req.body, (err) => {
    // Updating the data of concerned menu
    if (!err) {
      res.send("success");
    } else {
      res.send("failure");
    }
  });
});

// ------------CATALOGS---------

// Create a new catalog
app.post("/catalog", (req, res) => {
  const catalog = new Catalog(req.body); // Creating new catalog
  catalog.save((err) => {
    // Saving the catalog
    if (!err) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
});

// Delete all catalogs in the collection
app.delete("/catalogs", (req, res) => {
  Catalog.deleteMany((err) => {
    // Deleting all documents
    if (err) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  });
});

// Edit an existing catalog
app.patch("/catalog/:catalogNumber", (req, res) => {
  if (req.body.menuIds) {
    Catalog.findOne(
      // Fetching data of the catalog corresponding to the catalog number specified
      { _id: req.params.catalogId },
      (err, catalogData) => {
        req.body.menuIds = catalogData.menuIds.concat(req.body.menuIds); // Adding the ObjectIds of the new menus to the existing array of ObjectIds
      }
    );
  }
  Catalog.updateOne(
    // Updating the data of concerned catalog
    { _id: req.params.catalogId },
    req.body,
    (err) => {
      if (!err) {
        res.send("success");
      } else {
        res.send("failed");
      }
    }
  );
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
