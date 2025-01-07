const express = require("express");
const router = express.Router(); //suur "R" on oluline!!!
const general = require("../generalfnc");

router.use(general.checkLogin);

const {
	galleryOpenPage,
	galleryPage} = require("../controllers/galleryControllers");

router.route("/").get(galleryOpenPage);
router.route("/:page").get(galleryPage);



module.exports = router;