const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: '.env.dev',
  })
} else {
  dotenv.config()
}

module.exports = {
  PORT: process.env.PORT || 8002,
  JWT_SECRET: process.env.JWT_SECRET,
  whitelist: ['http://localhost:3000'],
}
