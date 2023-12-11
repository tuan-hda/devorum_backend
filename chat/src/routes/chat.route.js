const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.post(
    '/rooms',
    authenticateJWT,
    require('../controllers/getRoom.controller.js')
)

router.get(
    '/rooms',
    authenticateJWT,
    require('../controllers/listRooms.controller.js')
)

router.get(
    '/rooms/:id/messages',
    authenticateJWT,
    require('../controllers/listRoomMessage.controller.js')
)

module.exports = router
