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
  DOMAIN_NAME: process.env.DOMAIN_NAME || 'http://localhost:8002/',
  AWS_CLOUDFRONT_DOMAIN: process.env.AWS_CLOUDFRONT_DOMAIN || 'https://d1vh9hdowc7dho.cloudfront.net/',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'devorum',
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION || 'ap-southeast-1',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
}
