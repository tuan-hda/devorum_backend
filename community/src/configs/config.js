const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    DB_CONN_STR:
        process.env.DB_CONN_STR || 'mongodb://localhost:27017/community',
    PORT: process.env.PORT || 8100,
    JWT_SECRET: process.env.JWT_SECRET,
    whitelist: ['http://localhost:3000'],
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || 'amqp://192.168.1.242',
    RPC_QUEUE_NAME: process.env.RPC_QUEUE_NAME || 'rpc_community_queue',
    REPLY_TO_QUEUE_NAME: process.env.REPLY_TO_QUEUE_NAME || 'community_queue',
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
    RECOMBEE_DATABASE_ID: process.env.RECOMBEE_DATABASE_ID,
    RECOMBEE_DATABASE_PRIVATE_TOKEN:
        process.env.RECOMBEE_DATABASE_PRIVATE_TOKEN,
}
