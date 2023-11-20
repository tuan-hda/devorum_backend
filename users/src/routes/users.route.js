const express = require('express')
const { validateNewUser, validateLogin } = require('../validators/user.validator')
const registerUser = require('../controllers/users/registerUser.controller')
const login = require('../controllers/users/login.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const getCurrentProfile = require('../controllers/users/getCurrentProfile.controller')
const getProfile = require('../controllers/users/getProfile.controller')
const router = express.Router()

router.post('/register', validateNewUser(), registerUser)
router.post('/login', validateLogin(), login)

router.get('/current', authenticateJWT, getCurrentProfile)
router.get('/:username', (req, res, next) => authenticateJWT(req, res, next, true), getProfile)

module.exports = router
