const express = require('express')
const followUserController = require('../controllers/relationship/followUser.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const { validateNewFollow, validateNewBlock } = require('../validators/follow.validator')
const unfollowUserController = require('../controllers/relationship/unfollowUser.controller')

const router = express.Router()

router.post('/follow', authenticateJWT, validateNewFollow(), followUserController)
router.delete('/follow/:id', authenticateJWT, unfollowUserController)

router.post('/block', authenticateJWT, validateNewBlock(), followUserController)

module.exports = router
