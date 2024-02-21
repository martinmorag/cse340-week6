const express = require("express")
const router = new express.Router() 
const baseController = require("../controllers/baseController")
const utilities = require("../utilities/")
const validate = require("../utilities/comment-validation")

router.get("/", utilities.checkJWTToken, utilities.handleErrors(baseController.buildHome));
router.get("/post-comment", utilities.checkJWTToken, utilities.handleErrors(baseController.buildPostComment))
router.post("/post-comment", 
    utilities.checkJWTToken, 
    validate.postCommentRules(),
    validate.checkPostData,
    utilities.handleErrors(baseController.postComment));
router.get("/comment", utilities.handleErrors(baseController.buildComment));
router.post("/delete-comment",
    utilities.checkJWTToken,
    validate.deleteCommentRules(),
    validate.checkDeleteData,
    utilities.handleErrors(baseController.deleteComment));
router.get("/delete-comment", utilities.checkJWTToken, utilities.handleErrors(baseController.buildDeleteComment))

module.exports = router;
