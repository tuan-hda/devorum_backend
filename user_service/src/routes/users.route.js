const express = require('express')
const { validateNewUser, validateLogin } = require('../validators/user.validator')
const registerUser = require('../controllers/registerUser.controller')
const login = require('../controllers/login.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const getCurrentProfile = require('../controllers/getCurrentProfile.controller')
const router = express.Router()

router.post('/register', validateNewUser(), registerUser)
router.post('/login', validateLogin(), login)

router.get('/current', authenticateJWT, getCurrentProfile)

module.exports = router
