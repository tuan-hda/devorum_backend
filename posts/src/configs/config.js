const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  DB_CONN_STR: process.env.DB_CONN_STR || "mongodb://localhost:27017/posts_db",
  PORT: process.env.PORT || 8003,
  JWT_SECRET: process.env.JWT_SECRET,
  whitelist: ["http://localhost:3000"],
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "amqp://192.168.1.242",
  RPC_QUEUE_NAME: process.env.MSG_QUEUE_URL || "rpc_posts_queue",
  REPLY_TO_QUEUE_NAME: process.env.REPLY_TO_QUEUE_NAME || "posts_queue",
};
