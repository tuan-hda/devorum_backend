const express = require("express");
const app = express();
const config = require("./configs/config");
const mongoose = require('mongoose')
const postsRoute = require('./routes/posts.route')

// connect db
mongoose.connect(config.DB_CONN_STR)
const connection = mongoose.connection
connection.once('open', () => {
  console.log(new Date(), 'database established successfully')
})

app.use('/',postsRoute)

app.listen(config.PORT, () => {
  console.log(new Date(), "listening on port:", config.PORT);
});
