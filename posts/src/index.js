const express = require("express");
const app = express();
const config = require("./configs/config");

app.get("/abc", (req, res, next) => {
  res.status(200).send("Tus dep zai");
});

app.listen(config.PORT, () => {
  console.log(new Date(), "listening on port:", config.PORT);
});
