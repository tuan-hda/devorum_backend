const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const config = require('../configs/config')

const router = express.Router()

router.post('/', authenticateJWT, async (req, res, next) => {})

router.post('/data/:name', (req, res) => {
  const name = req.params.name
  res.redirect(config.AWS_CLOUDFRONT_DOMAIN + name)
})

module.exports = router
