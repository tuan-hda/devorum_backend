const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");

router.get("/", require("../controllers/posts/getPosts.controller"));

router.post(
  "/create",
  authenticateJWT,
  require("../controllers/posts/createPost.controller")
);

router.put(
  "/update",
  authenticateJWT,
  require("../controllers/posts/updatePost.controller")
);
router.put(
  "/toggle-vote",
  authenticateJWT,
  require("../controllers/posts/toggleVote.controller")
);
router.put(
  "/add-view",
  authenticateJWT,
  require("../controllers/posts/addView.controller")
);
router.delete(
  "/delete",
  authenticateJWT,
  require("../controllers/posts/deletePost.controller")
);

module.exports = router;
