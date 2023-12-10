const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./configs/config.js");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users.route.js");
const bodyParser = require("body-parser");
const relationshipRoute = require("./routes/relationship.route.js");
const { isHttpError } = require("http-errors");
const initConsumer = require("./broker/initConsumer.js");

// connect db
mongoose.connect(config.DB_CONN_STR);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(new Date(), "database established successfully");
});

initConsumer();

app.use(cors({ origin: config.whitelist, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/relationship", relationshipRoute);
app.use("/", usersRoute);
app.use((err, req, res, next) => {
  if (isHttpError(err) && err.statusCode < 500) {
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  if (err.kind === "ObjectId") {
    return res.status(400).json({
      msg: "Invalid id",
    });
  }

  console.log(err);
  res.status(500).json({
    msg: "Internal server error",
  });
});

app.listen(config.PORT, () => {
  console.log(new Date(), "listening on port:", config.PORT);
});

process.on("uncaughtException", function (err) {
  console.log(err);
});
