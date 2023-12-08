const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()
const createCommunityController = require('../controllers/createCommunity.controller')
const checkValidityCommunityName = require('../controllers/checkValidityCommunityName.controller')
const getCommunityController = require('../controllers/getCommunity.controller')
const updateCommunityController = require('../controllers/updateCommunity.controller')
const createUserTitleController = require('../controllers/createUserTitleController.controller')
const newUserTitleValidator = require('../validators/newUserTitle.validator')
const listUserTitlesController = require('../controllers/listUserTitles.controller')
const joinCommunityController = require('../controllers/joinCommunity.controller')
const leaveCommunityController = require('../controllers/leaveCommunity.controller')

router.post('/', authenticateJWT, createCommunityController)
router.get('/validity', authenticateJWT, checkValidityCommunityName)
router.get(
    '/:name',
    (req, res, next) => authenticateJWT(req, res, next, true),
    getCommunityController
)
router.put('/:name', authenticateJWT, updateCommunityController)

router.post('/:name/members', authenticateJWT, joinCommunityController)
router.delete('/:name/members', authenticateJWT, leaveCommunityController)

router.post(
    '/:name/user-titles',
    authenticateJWT,
    newUserTitleValidator,
    createUserTitleController
)
router.get('/:name/user-titles', listUserTitlesController)

module.exports = router
