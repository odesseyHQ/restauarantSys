const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

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
  dishNumber: Number,
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
  cuisineNumber: Number,
  cuisineName: String,
};

// Schematic for the collection of catalogs
const catalogSchema = {
  hotelName: String,
  catalogNumber: Number,
  menuIds: Array,
};

// Schematic for the collection of menus
const menuSchema = {
  menuNumber: Number,
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
  Cuisine.countDocuments((err, data) => {
    // Returns the count of the existing cuisines inside the collection
    var cuisineCount = 0; // Declaring a new variable to store the current number of cuisines in the collection
    cuisineCount = data + 1;
    req.body["cuisineNumber"] = cuisineCount; // Assigning the updated cuisine count as the cuisine number of new cuisine
    const cuisine = new Cuisine(req.body); // Creating a new cuisine
    cuisine.save((err) => {
      // Saving the cuisine
      if (!err) {
        res.send("success");
      } else {
        res.send("failed");
      }
    });
  });
});

// Delete all cuisines in the collection
app.delete("/cuisine", (req, res) => {
  Cuisine.deleteMany((err) => { // Deleting all documents
    if (err) {
        res.send("Success");
      } else {
        res.send("Failed");
      }
  });
});

// Edit an exsiting cuisine
app.patch("/cuisine/:cuisineNumber", (req, res) => {
  Cuisine.updateOne(
    { cuisineNumber: req.params.cuisineNumber },
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

// ----------DISHES-----------

// Create new dish
app.post("/dish", (req, res) => {
  if (req.body.variantCount > 1) {
    // Checking whether there is more then one variant to be added for the dish
    var variants = req.body.variants; // Assigning the array of variants in the request body to a new variable
    var variantList = []; // Creating a new array
    for (var i = 0; i < variants.size.length; i++) {
      // Taking each size-price key-value pair and creating a new object of them
      var variant = {
        size: variants.size[i],
        price: variants.price[i],
      };
      variantList.push(variant); // Adding each object in to the array
    }
    req.body.variants = variantList; // Assigning the value of variants in the request body with the new array
  } // If there is only one variant then req.body.variants dosent need to be changed
  Dish.countDocuments((err, data) => {
    // Returns the count of the existing dishes inside the collection
    var dishCount = 0; // Declaring a new variable to store the current number of dishes in the collection
    dishCount = data + 1;
    req.body["dishNumber"] = dishCount; // Assigning the updated dish count as the dish number of new dish
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
});

// Delete all dishes in the collection
app.delete("/dish", (req, res) => {
  Dish.deleteMany((err) => { // Deleting all documents
    if (err) {
        res.send("Success");
      } else {
        res.send("Failed");
      }
  });
});

// Edit an existing dish
app.patch("/dish/:dishNumber", (req, res) => {
  Dish.findOne({ dishNumber: req.params.dishNumber }, (err, dishData) => {
    // Fetching data of the dish corresponding to the dish number specified
    if (req.body.variantCount > 1) {
      // Checking whether there is more than one dish variant to be added
      var variants = req.body.variants;
      for (var i = 0; i < variants.size.length; i++) {
        var variant = {
          size: variants.size[i],
          price: variants.price[i],
        };
        dishData.variants.push(variant); // Adding each variant object to the existing array of objects
      }
      req.body.variants = dishData.variants;
    } else {
      // If there is only one variant to be added
      req.body.variants = dishData.variants.concat(req.body.variants); // The new variant object is added to the existing array of variant objects
    }
    Dish.updateOne({ dishNumber: req.params.dishNumber }, req.body, (err) => {
      // Updating the data of the concerened dish
      if (!err) {
        res.send("success");
      } else {
        res.send("failed");
      }
    });
  });
});

// ------------MENUS---------

// Create new menu
app.post("/menu", (req, res) => {
  Menu.countDocuments((err, data) => {
    // Returns the count of the existing menus inside the collection
    var menuCount = 0; // Declaring a new variable to store the current number of menus in the collection
    menuCount = data + 1;
    req.body["menuNumber"] = menuCount; // Assigning the updated menu count as the menu number of new menu
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
});

// Delete all menus in the collection
app.delete("/menu", (req, res) => {
  Menu.deleteMany((err) => { // Deleting all documents
    if (err) {
        res.send("Success");
      } else {
        res.send("Failed");
      }
  });
});

// Edit an existing menu
app.patch("/menu/:menuNumber", (req, res) => {
  Menu.findOne({ menuNumber: req.params.menuNumber }, (err, menuData) => {
    // Fetching data of the menu corresponding to the menu number specified
    req.body.dishIds = menuData.dishIds.concat(req.body.dishIds); // Adding the ObjectIds of the new dishes to the existing array of ObjectIds
    Menu.updateOne({ menuNumber: req.params.menuNumber }, req.body, (err) => {
      // Updating the data of concerned menu
      if (!err) {
        res.send("success");
      } else {
        res.send("failure");
      }
    });
  });
});

// ------------CATALOGS---------

// Create a new catalog
app.post("/catalog", (req, res) => {
  Catalog.countDocuments((err, data) => {
    // Returns the count of the existing catalogs inside the collection
    var catalogCount = 0; // Declaring a new variable to store the current number of catalogs in the collection
    catalogCount = data + 1;
    req.body["catalogNumber"] = catalogCount; // Assigning the updated catalog count as the catalog number of new catalog
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
});

// Delete all catalogs in the collection
app.delete("/catalogs", (req, res) => {
  Catalog.deleteMany((err) => { // Deleting all documents
    if (err) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  });
});

// Edit an existing catalog
app.patch("/catalog/:catalogNumber", (req, res) => {
  Catalog.findOne(
    // Fetching data of the catalog corresponding to the catalog number specified
    { catalogNumber: req.params.catalogNumber },
    (err, catalogData) => {
      req.body.menuIds = catalogData.menuIds.concat(req.body.menuIds); // Adding the ObjectIds of the new menus to the existing array of ObjectIds
      Catalog.updateOne(
        // Updating the data of concerned catalog
        { catalogNumber: req.params.catalogNumber },
        req.body,
        (err) => {
          if (!err) {
            res.send("success");
          } else {
            res.send("failed");
          }
        }
      );
    }
  );
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});
