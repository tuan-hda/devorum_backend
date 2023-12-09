const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const UserTitleModel = require('../models/UserTitle')

const deleteUserTitleController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const id = req.params.id

        let community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        if (!user) {
            throw createHttpError[401]('Unauthorized')
        }
        if (user._id != community.createdBy) {
            throw createHttpError[403]('Forbidden')
        }

        const userTitle = await UserTitleModel.findById(id)
        if (!userTitle) {
            throw createHttpError[404]('User title not found')
        }
        if (userTitle.communityId != community._id) {
            throw createHttpError[403]('Forbidden')
        }

        await userTitle.deleteOne()

        return res.status(200).json({ msg: 'User title deleted' })
    } catch (error) {
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        next(error)
    }
}

module.exports = deleteUserTitleController
