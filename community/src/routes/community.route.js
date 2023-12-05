const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()
const createCommunityController = require('../controllers/createCommunity.controller')
const checkValidityCommunityName = require('../controllers/checkValidityCommunityName.controller')
const getCommunityControlelr = require('../controllers/getCommunity.controller')

router.post('/', authenticateJWT, createCommunityController)
router.get('/:name', getCommunityControlelr)
router.get('/validity', authenticateJWT, checkValidityCommunityName)

module.exports = router
