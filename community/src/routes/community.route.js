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

router.post('/', authenticateJWT, createCommunityController)
router.get('/validity', authenticateJWT, checkValidityCommunityName)
router.get('/:name', getCommunityController)
router.put('/:name', authenticateJWT, updateCommunityController)

router.post(
    '/:name/user-titles',
    authenticateJWT,
    newUserTitleValidator,
    createUserTitleController
)
router.get('/:name/user-titles', listUserTitlesController)

module.exports = router
