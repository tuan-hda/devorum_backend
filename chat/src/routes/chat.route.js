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

router.get(
    '/rooms/:id/messages',
    authenticateJWT,
    require('../controllers/listRoomMessage.controller.js')
)

// router.post(
//     '/rooms/:id/messages/:messageId/like',
//     authenticateJWT,
//     require('../controllers/likeMessage.controller.js')
// )

module.exports = router
