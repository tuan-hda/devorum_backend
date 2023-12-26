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
const updateUserTitleController = require('../controllers/updateUserTitle.controller')
const deleteUserTitleController = require('../controllers/deleteUserTitle.controller')
const getCommunityMembersController = require('../controllers/getCommunityMembers.controller')
const updateJoinedCommunityController = require('../controllers/updateJoinedCommunity.controller')
const selfUpdateCommunityStatusController = require('../controllers/selfAssignUserTitle.controller')
const addModController = require('../controllers/addMod.controller')
const deleteModController = require('../controllers/deleteMod.controller')

// Community
router.post('/', authenticateJWT, createCommunityController)
router.get('/validity', authenticateJWT, checkValidityCommunityName)
router.get(
    '/:name',
    (req, res, next) => authenticateJWT(req, res, next, true),
    getCommunityController
)
router.put('/:name', authenticateJWT, updateCommunityController)

// Members
router.get(
    '/:name/members',
    (req, res, next) => authenticateJWT(req, res, next, true),
    getCommunityMembersController
)
router.post('/:name/members', authenticateJWT, joinCommunityController)
router.delete('/:name/members', authenticateJWT, leaveCommunityController)
router.delete(
    '/:name/members/:username',
    authenticateJWT,
    require('../controllers/removeUserFromCommunity.controller')
)

router.put(
    '/:name/members/self-update',
    authenticateJWT,
    selfUpdateCommunityStatusController
)
router.put(
    '/:name/members/:username',
    authenticateJWT,
    updateJoinedCommunityController
)

// User titles
router.post(
    '/:name/user-titles',
    authenticateJWT,
    newUserTitleValidator,
    createUserTitleController
)
router.get('/:name/user-titles', listUserTitlesController)
router.put('/:name/user-titles/:id', authenticateJWT, updateUserTitleController)
router.delete(
    '/:name/user-titles/:id',
    authenticateJWT,
    deleteUserTitleController
)

// Mods
router.post('/:name/mods', authenticateJWT, addModController)
router.delete('/:name/mods/:username', authenticateJWT, deleteModController)

router.post(
    '/:name/invitation',
    authenticateJWT,
    require('../controllers/invite.controller')
)
router.delete(
    '/:name/invitation/:username',
    authenticateJWT,
    require('../controllers/deleteInvitation.controller')
)

// Ban
router.post(
    '/:name/ban',
    authenticateJWT,
    require('../controllers/banUser.controller')
)
router.get(
    '/:name/ban',
    authenticateJWT,
    require('../controllers/listBannedUsers.controller')
)
router.delete(
    '/:name/ban/:username',
    authenticateJWT,
    require('../controllers/deleteBanUser.controller')
)

module.exports = router
