const express = require('express')
const followUserController = require('../controllers/relationship/followUser.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const { validateNewFollow, validateNewBlock } = require('../validators/follow.validator')
const unfollowUserController = require('../controllers/relationship/unfollowUser.controller')
const blockUserController = require('../controllers/relationship/blockUser.controller')
const unblockUserController = require('../controllers/relationship/unblockUser.controller')
const getFollowInformationController = require('../controllers/relationship/getFollowInformationController.controller')

const router = express.Router()

router.get('/follow', authenticateJWT, getFollowInformationController)
router.post('/follow', authenticateJWT, validateNewFollow(), followUserController)
router.delete('/follow/:id', authenticateJWT, unfollowUserController)

router.post('/block', authenticateJWT, validateNewBlock(), blockUserController)
router.delete('/block/:id', authenticateJWT, unblockUserController)

module.exports = router
