const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imageSizeReducer, localFileUpload} = require("../controllers/fileUpload");

//api route
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);
router.post('/localFileUpload', localFileUpload);

module.exports = router;