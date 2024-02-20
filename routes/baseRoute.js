const express = require("express")
const router = new express.Router() 
const baseController = require("../controllers/baseController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/add-validation')

router.get("/", utilities.checkJWTToken, utilities.handleErrors(baseController.buildHome));
router.get("/post-comment", utilities.handleErrors(baseController.buildPostComment))
router.post("/post-comment", utilities.checkJWTToken, utilities.handleErrors(baseController.postComment));
router.get("/comment", utilities.handleErrors(baseController.buildComment));
router.post("/delete-comment", utilities.checkJWTToken, utilities.handleErrors(baseController.deleteComment));
router.get("/delete-comment", utilities.handleErrors(baseController.buildDeleteComment))

module.exports = router;