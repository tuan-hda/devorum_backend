const express = require("express");
const router = express.Router();
const getPosts = require("../controllers/posts/getPosts.controller");
// Create new post
const { authenticateJWT } = require("../middlewares/auth.middleware");
const createPost = require("../controllers/posts/createPost.controller");

router.get("/", getPosts);
router.post('/create', authenticateJWT, createPost)

module.exports = router;
