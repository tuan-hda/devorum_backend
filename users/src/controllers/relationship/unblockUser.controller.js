const createError = require('http-errors')
const BlockModel = require('../../models/Block')
const moment = require('moment')

const unblockUserController = async (req, res, next) => {
    try {
        const to = req.params.username
        const from = req.user.username
        const block = await BlockModel.findOne({
            to,
            from,
        })

        if (!block) {
            throw createError[400]('You have not blocked this person yet')
        }

        if (!block.effective) {
            throw createError[400]('You have just unblocked this person')
        }

        const oneDayAfter = moment().add(24, 'hours').utc()
        block.expiresAfter = oneDayAfter
        block.effective = false
        await block.save()

        res.status(200).json({
            msg: 'Unblocked user successfully. You cannot block this user again until after 24 hours.',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = unblockUserController
