var express = require("express");
var router = express.Router();

router.use('/cuisine',require('./cuisine.js'))
router.use('/dish',require('./dish.js'))
router.use('/menu',require('./menu.js'))
router.use('/catalog',require('./catalog.js'))

module.exports = router;