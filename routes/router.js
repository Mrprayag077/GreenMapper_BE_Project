const express = require("express");
const multer = require("multer");
const controller = require("../controller/controller");
const router = express.Router();
// const { addImage } = require("../controllers/imagesController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

// router
//   .route("/")
//   .get(controller.inputdata_form_get)
//   .post(controller.inputdata_form_post);

router.get("/", controller.main); //localhost:800/p/
router.get("/data/", controller.inputdata_form_get); //localhost:800/p/
router.post("/data/", controller.inputdata_form_post); //localhost:800/p/

module.exports = router;
