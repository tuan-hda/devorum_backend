const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");

router.get("/", require("../controllers/tags/getTags.controller"));

router.post(
  "/create",
  authenticateJWT,
  require("../controllers/tags/createTag.controller")
);

router.put(
  "/update",
  authenticateJWT,
  require("../controllers/tags/updateTag.controller")
);

router.delete(
  "/delete",
  authenticateJWT,
  require("../controllers/tags/deleteTag.controller")
);

module.exports = router;
