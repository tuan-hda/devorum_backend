const NotificationModel = require('../models/Notification')

const createNotificationController = async (req, res, next) => {
    try {
        const { type, content, trigger, of } = req.body

        const notification = new NotificationModel({
            type,
            content,
            trigger,
            of,
        })

        await notification.save()

        res.status(201).json(notification)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNotificationController,
}
