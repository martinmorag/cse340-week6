const pool = require("../database");

async function createComment(content) {
  try {
    const query = "INSERT INTO comments (content) VALUES ($1) RETURNING *";
    return await pool.query(query, [content]);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

async function getComments() {
  try {
    const query = "SELECT * FROM comments";
    const result = await pool.query(query);
    return result.rows; // Assuming comments are stored in rows
  } catch (error) {
    console.error("Error retrieving comments:", error);
    throw error;
  }
}

async function deleteComment(commentId) {
  try {
    const query = "DELETE FROM comments WHERE id = $1";
    await pool.query(query, [commentId]);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

module.exports = { createComment, getComments, deleteComment };