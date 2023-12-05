const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()
const createCommunityController = require('../controllers/createCommunity.controller')

router.post('/', authenticateJWT, createCommunityController)

module.exports = router
