const express = require('express')
const {
    validateNewUser,
    validateLogin,
} = require('../validators/user.validator')
const registerUser = require('../controllers/users/registerUser.controller')
const login = require('../controllers/users/login.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const getCurrentProfile = require('../controllers/users/getCurrentProfile.controller')
const getProfile = require('../controllers/users/getProfile.controller')
const updateProfile = require('../controllers/users/updateProfile.controller')
const getOverviewQuicksortController = require('../controllers/users/getOverviewQuicksort.controller')
const listProfiles = require('../controllers/users/listProfiles.controller')
const router = express.Router()

router.post('/register', validateNewUser(), registerUser)
router.post('/login', validateLogin(), login)

router.get('/', listProfiles)
router.get('/current', authenticateJWT, getCurrentProfile)
router.get('/quicksort', authenticateJWT, getOverviewQuicksortController)
router.get(
    '/:username',
    (req, res, next) => authenticateJWT(req, res, next, true),
    getProfile
)

router.put('/current', authenticateJWT, updateProfile)

module.exports = router
