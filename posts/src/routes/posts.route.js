const express = require("express");
const router = express.Router();
const getPosts = require("../controllers/posts/getPosts.controller");

router.get("/", getPosts);

module.exports = router;
