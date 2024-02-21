const utilities = require(".")
const invModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator")
const validate = {}

// Validation for posting a comment
validate.postCommentRules = () => {
    return [
        body("content")
            .trim()
            .isLength({ min: 1 })
            .withMessage("The comment must have a content."),
    ];
};

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkPostData = async (req, res, next) => {
    const { classification_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
      res.render("comment/post-comment", {
        errors,
        title: "Post comment",
        nav,
      })
      return
    }
    next();
};

// Validation for posting a comment
validate.deleteCommentRules = () => {
    return [
        body("conmentId")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Must have a Comment N."),
    ];
};

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkDeleteData = async (req, res, next) => {
    const { classification_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
      res.render("comment/delete-comment", {
        errors,
        title: "Delete comment",
        nav,
      })
      return
    }
    next();
};

module.exports = validate