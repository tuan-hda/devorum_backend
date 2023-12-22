const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const {
    createNotificationController,
} = require('../controllers/notifications.controller')

const notificationRouter = (socketIO) => {
    const router = express.Router()

    router.get('/test', (req, res) => {
        res.status(200).send('ok')
    })

    router.post('/notifications', authenticateJWT, createNotificationController)
    return router
}

module.exports = notificationRouter
