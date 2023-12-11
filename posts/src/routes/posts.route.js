const express = require("express");
const router = express.Router();
const getAllPosts = require("../controllers/posts/getAllPosts.controller");
const { getUserProducer } = require("../broker/userProducer");

router.get("/", getAllPosts);
router.get("/test", async (req, res, next) => {
  try {
    const data = await getUserProducer({ id: ["656e96252d8e5d48d0c8cd7e"] });
    res.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
