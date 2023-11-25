const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', authenticateJWT, async (req, res, next) => {})

module.exports = router
