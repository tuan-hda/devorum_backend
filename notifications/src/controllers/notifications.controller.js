const createHttpError = require('http-errors')
const NotificationModel = require('../models/Notification')
const createNotification = require('../services/createNotification')
const { getUserProducer } = require('../broker/userProducer')

module.exports.createNotificationController =
    (socketIO) => async (req, res, next) => {
        try {
            const { type, content, from, owner, action, href } = req.body

            res.status(201).json(
                await createNotification(socketIO)(
                    type,
                    content,
                    from,
                    owner,
                    action,
                    href
                )
            )
        } catch (error) {
            next(error)
        }
    }

module.exports.listNotificationsController = async (req, res, next) => {
    try {
        const user = req.user

        let notifications = await NotificationModel.find({
            owner: user.username,
        }).sort({
            createdAt: -1,
        })
        notifications = notifications.map((noti) => noti.toObject())
        const fromUsers = notifications
            .filter((noti) => noti.type === 'user')
            .map((noti) => noti.from)

        if (fromUsers.length !== 0) {
            let fromUsersData = await getUserProducer({ username: fromUsers })
            if (Array.isArray(fromUsersData) && fromUsersData.length > 0) {
                console.log(
                    'fromUsersData from list notifications before convert to object',
                    fromUsersData
                )
                fromUsersData = fromUsersData.reduce((acc, cur) => {
                    acc[cur.username] = cur
                }, {})

                console.log(
                    'fromUsersData from list notifications after convert to object',
                    fromUsersData
                )

                notifications = notifications.map((noti) => {
                    if (noti.type === 'user') {
                        noti.fromData = fromUsersData[noti.from]
                    }
                    return noti
                })
            }
        }

        res.status(200).json(notifications)
    } catch (error) {
        next(error)
    }
}

module.exports.updateNotificationController = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = req.user
        const notification = await NotificationModel.findById(id)

        if (!notification) {
            throw createHttpError[404]('Notification not found')
        }

        if (String(notification.owner) !== user.username) {
            throw createHttpError[403]('Forbidden')
        }

        const { isRead } = req.body
        notification.isRead = isRead

        await notification.save()
        res.status(200).json({
            msg: 'Updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports.deleteNotificationController = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = req.user

        const notification = await NotificationModel.findById(id)

        if (!notification) {
            throw createHttpError[404]('Notification not found')
        }

        if (String(notification.owner) !== user.username) {
            throw createHttpError[403]('Forbidden')
        }

        await notification.deleteOne()
        res.status(200).json({
            msg: 'Deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}
