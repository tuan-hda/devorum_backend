const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const {
    createNotificationController,
    listNotificationsController,
    updateNotificationController,
    deleteNotificationController,
} = require('../controllers/notifications.controller')

const notificationRouter = (socketIO) => {
    const router = express.Router()

    router.get('/test', (req, res) => {
        res.status(200).send('ok')
    })
    router.post('/', authenticateJWT, createNotificationController(socketIO))
    router.get('/', authenticateJWT, listNotificationsController)
    router.put('/:id', authenticateJWT, updateNotificationController)
    router.delete('/:id', authenticateJWT, deleteNotificationController)

    return router
}

module.exports = notificationRouter
