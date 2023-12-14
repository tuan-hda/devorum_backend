const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");

router.get("/", require("../controllers/tags/getTags.controller"));

router.post(
  "/create",
  authenticateJWT,
  require("../controllers/tags/createTag.controller")
);

module.exports = router;
