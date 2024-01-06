const createError = require('http-errors')
const FollowModel = require('../../models/Follow')

const unfollowUserController = async (req, res, next) => {
    try {
        const to = req.params.username
        const from = req.user.username
        const follow = await FollowModel.findOne({
            to,
            from,
        })

        if (!follow) {
            throw createError[400]('You have not followed this person yet')
        }

        await follow.deleteOne()
        res.status(200).json({
            msg: 'Unfollowed user successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = unfollowUserController
