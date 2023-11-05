const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: '.env.dev',
  })
} else {
  dotenv.config()
}

module.exports = {
  DB_CONN_STR: process.env.DB_CONN_STR || 'mongodb://localhost:27017/user_db',
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET,
  whitelist: ['http://localhost:3000'],
}
