const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    DB_CONN_STR: process.env.DB_CONN_STR || 'mongodb://localhost:27017/user_db',
    PORT: process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET,
    whitelist: ['http://localhost:3000'],
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || 'amqp://192.168.1.242',
    RPC_QUEUE_NAME: process.env.RPC_QUEUE_NAME || 'users_rpc_queue',
    REPLY_TO_QUEUE_NAME: process.env.REPLY_TO_QUEUE_NAME || 'users_queue',
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
}
