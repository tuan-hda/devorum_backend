const express = require('express')
const followUserController = require('../controllers/relationship/followUser.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const {
    validateNewFollow,
    validateNewBlock,
} = require('../validators/follow.validator')
const unfollowUserController = require('../controllers/relationship/unfollowUser.controller')
const blockUserController = require('../controllers/relationship/blockUser.controller')
const unblockUserController = require('../controllers/relationship/unblockUser.controller')
const getFollowInformationController = require('../controllers/relationship/getFollowInformationController.controller')
const getBlockInformationController = require('../controllers/relationship/getBlockInformationController.controller')
const excludeYourself = require('../middlewares/excludeYourself.middleware')

const router = express.Router()

router.get('/follow', authenticateJWT, getFollowInformationController)
router.post(
    '/follow',
    authenticateJWT,
    excludeYourself,
    validateNewFollow(),
    followUserController
)
router.delete(
    '/follow/:username',
    authenticateJWT,
    excludeYourself,
    unfollowUserController
)

router.get('/block', authenticateJWT, getBlockInformationController)
router.post(
    '/block',
    authenticateJWT,
    excludeYourself,
    validateNewBlock(),
    blockUserController
)
router.delete(
    '/block/:username',
    authenticateJWT,
    excludeYourself,
    unblockUserController
)

module.exports = router
