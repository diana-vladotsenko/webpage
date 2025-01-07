const express=require('express');
const router = express.Router(); //suur R on oluline
const bodyparser = require("body-parser");
/* const general = require('../generalfnc'); */
const {
	newsHome,
	addNews,
	addingNews,

} = require('../controllers/newsController');


//koikidele routes vahevara - checkLogin. Koik ruuteri masruutid kasutavad seda: (CheckLogin)
router.use(general.checkLogin);

//Routes - marsruutid
router.route("/").get(newsHome);

router.route("/sisenemine").get(addNews);

router.route("/sisenemine").post(addingNews);

router.route("/valjumine").get(newsList);

router.route("/valjumine").post(newsList);

module.exports = router;