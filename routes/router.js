const express = require("express");
const multer = require("multer");
const controller = require("../controller/controller");
const router = express.Router();
// const { addImage } = require("../controllers/imagesController");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

//HOME SECTION------------------------------------------------
router.get("/", controller.home_p);

//MAP SECTION------------------------------------------------
router.get("/map", controller.map_p); //localhost:800/p/



//NEW POST SECTION------------------------------------------------
router.get("/post-new", controller.post_org_new_get);
router.post("/post-new", controller.post_org_new_post);


//NORMAL POSTS -------------------------------------------------------
router.get("/posts", controller.post_individuals);


//UPDATE POSTS -------------------------------------------------------
router.get("/posts-update", controller.post_org_update_get);
router.post("/posts-update", controller.post_org_update_post);

router.get("/success", controller.success_get);



//UNKOWNED :( SECTION------------------------------------------------
router.get("/data/", controller.inputdata_form_get); //localhost:800/p/
router.post("/data/", controller.inputdata_form_post); //localhost:800/p/

module.exports = router;







// router
//   .route("/")
//   .get(controller.inputdata_form_get)
//   .post(controller.inputdata_form_post);