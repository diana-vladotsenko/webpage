const express=require('express');
const router = express.Router(); //suur R on oluline
const bodyparser = require("body-parser");
/* const general = require('../generalfnc'); */
const {
	weatherHome,
	weatherAddingHome,
	weatherAdding,
	changeAdding,
} = require('../controllers/weatherController');


//Routes - marsruutid
router.route("/").get(weatherHome);
router.route("/addnews").get(weatherAddingHome);
router.route("/addnews").post(weatherAdding);
router.route("/weather").post(changeAdding);


module.exports = router;