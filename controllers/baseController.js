const utilities = require("../utilities/")
const Comment = require("../models/comment-model");
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav();
  const comments = await Comment.getComments();
  res.render("index", {title: "Home", nav, comments})
}

baseController.buildComment = async function(req, res) {
  let nav = await utilities.getNav()
  res.render("comment/comment", {
    title: "Thank you for your comment!", 
    nav
  })
}

baseController.buildPostComment = async function(req, res, next) {
  const nav = await utilities.getNav();
  res.render("comment/post-comment", {title: "Post Comment", nav, errors: null})
}

baseController.postComment = async function(req, res) {
  let nav = await utilities.getNav()
  const { content } = req.body
  const comment = await Comment.createComment(content);
  if (comment) {
    res.status(201).render("comment/comment", {
      title: "Thank you for your comment",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the comment failed.")
    res.status(501).render("index", {
      title: "Home",
      nav,
    })
  }
}

baseController.buildDeleteComment = async function(req, res, next) {
  const nav = await utilities.getNav();
  res.render("comment/delete-comment", {title: "Delete Comment", nav, errors: null})
}

baseController.deleteComment = async function(req, res, next) {
  const { commentId }= req.body // Extract comment ID from form data
  // Assuming Comment.deleteComment returns a boolean indicating success or failure
  const deletionSuccessful = await Comment.deleteComment(commentId);
  if (deletionSuccessful) {
    // Comment was deleted successfully, send 204 No Content status
    res.status(200).render("index", {
      title: "Thank you for your comment",
      nav,
    })
  } else {
    // Invalid comment ID, redirect to the homepage or any other appropriate page
    return res.redirect("/");
  }
}

module.exports = baseController
