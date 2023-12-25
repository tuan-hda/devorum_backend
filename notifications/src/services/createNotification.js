const { getUserProducer } = require('../broker/userProducer')
const NotificationModel = require('../models/Notification')

const createNotification =
    (socketIO) =>
    async ({ type, content, from, owner, action, href }) => {
        if (type === 'user' && action === 'follow') {
            const oldFollowNotification = await NotificationModel.findOne({
                type: 'user',
                action: 'follow',
                from: from,
            })
            if (oldFollowNotification) {
                return {}
            }
        }

        let notification = new NotificationModel({
            type,
            content,
            from,
            owner,
            action,
            href,
        })

        await notification.save()
        notification = notification.toObject()
        notification.fromData =
            (await getUserProducer({ username: notification.from }))?.at(0) ??
            notification.from

        console.log('Send notification to:', owner)
        console.log('socketIO instance:', socketIO)
        socketIO.to(owner).emit('notification', notification)

        return notification
    }

module.exports = createNotification
