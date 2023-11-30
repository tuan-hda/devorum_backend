const express = require("express");
const router = express.Router();
const getAllPosts = require("../controllers/posts/getAllPosts.controller");

router.get("/posts", getAllPosts);

module.exports = router;
