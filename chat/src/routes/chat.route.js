const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.get(
    '/rooms/:username',
    authenticateJWT,
    require('../controllers/getRoom.controller.js')
)

router.get(
    '/rooms',
    authenticateJWT,
    require('../controllers/listRooms.controller.js')
)

module.exports = router
