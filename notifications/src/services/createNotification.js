const NotificationModel = require('../models/Notification')

const createNotification =
    (socketIO) => async (type, content, from, owner, action, href) => {
        const notification = new NotificationModel({
            type,
            content,
            from,
            owner,
            action,
            href,
        })

        await notification.save()
        socketIO.to(owner).emit('notification', notification)

        return notification
    }

module.exports = createNotification
