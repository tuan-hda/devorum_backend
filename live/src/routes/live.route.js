const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get(
    '/',
    authenticateJWT,
    require('../controllers/listLiveRooms.controller')
)

router.post(
    '/',
    authenticateJWT,
    require('../controllers/createLiveRoom.controller')
)

router.put(
    '/:id',
    authenticateJWT,
    require('../controllers/updateLiveRoom.controller')
)

module.exports = router
