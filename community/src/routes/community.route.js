const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()
const createCommunityController = require('../controllers/createCommunity.controller')
const checkValidityCommunityName = require('../controllers/checkValidityCommunityName.controller')
const getCommunityController = require('../controllers/getCommunity.controller')
const updateCommunityController = require('../controllers/updateCommunity.controller')

router.post('/', authenticateJWT, createCommunityController)
router.get('/validity', authenticateJWT, checkValidityCommunityName)
router.get('/:name', getCommunityController)
router.put('/:name', authenticateJWT, updateCommunityController)

module.exports = router
