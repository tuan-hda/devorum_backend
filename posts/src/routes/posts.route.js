const express = require("express");
const router = express.Router();
const getAllPosts = require("../controllers/posts/getAllPosts.controller");
const { getUserProducer } = require("../broker/userProducer");

router.get("/posts", getAllPosts);
router.get("/test", async (req, res, next) => {
  try {
    const data = await getUserProducer({ username: "tuan-hdxa" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;