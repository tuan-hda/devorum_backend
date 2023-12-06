const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()
const createCommunityController = require('../controllers/createCommunity.controller')
const checkValidityCommunityName = require('../controllers/checkValidityCommunityName.controller')
const getCommunityController = require('../controllers/getCommunity.controller')
const { getUserProducer } = require('../broker/userProducer')

router.post('/', authenticateJWT, createCommunityController)
router.get('/validity', authenticateJWT, checkValidityCommunityName)
router.get('/test', async (req, res, next) => {
  try {
    const data = await getUserProducer({ username: 'tuan-hdxa' })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})
router.get('/:name', getCommunityController)

module.exports = router
