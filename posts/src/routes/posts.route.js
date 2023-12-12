const express = require("express");
const router = express.Router();
const getAllPosts = require("../controllers/posts/getAllPosts.controller");
const { getUserProducer } = require("../broker/userProducer");

router.get("/", getAllPosts);
router.get("/test", async (req, res, next) => {
  try {
    const data = await getUserProducer({ id: ["657739e9a97eb9bea8d7b7a6"] });
    res.status(200).json(data[0]);
  } catch (error) {
    next("error when test", error);
  }
});

module.exports = router;
