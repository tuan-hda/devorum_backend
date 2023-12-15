const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");

router.get("/", require("../controllers/posts/getPosts.controller"));

router.post(
  "/create",
  authenticateJWT,
  require("../controllers/posts/createPost.controller")
);

router.post(
  "/update",
  authenticateJWT,
  require("../controllers/posts/updatePost.controller")
);

module.exports = router;
