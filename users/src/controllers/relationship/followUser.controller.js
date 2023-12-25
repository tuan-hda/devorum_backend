const createError = require('http-errors')
const { validationResult } = require('express-validator')
const FollowModel = require('../../models/Follow')
const {
    createNotificationProducer,
} = require('../../broker/notificationProducer')
const config = require('../../configs/config')

const followUserController = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    try {
        const to = req.body.to
        const from = req.user.username
        const follow = new FollowModel({
            to: to,
            from,
        })

        await follow.save()
        res.status(200).json({ msg: 'Followed user successfully' })
        createNotificationProducer({
            type: 'user',
            content: `User ${req.user.username} has followed you. Follow again!`,
            from: from,
            owner: to,
            action: 'follow',
            href: `${config.FRONTEND_DOMAIN}/p/${req.user.username}`,
        })
    } catch (error) {
        if (error.code === 11000) {
            return next(createError[400]('Already followed this user'))
        }
        next(error)
    }
}

module.exports = followUserController
