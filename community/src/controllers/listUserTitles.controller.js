const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const UserTitleModel = require('../models/UserTitle')

const listUserTitlesController = async (req, res, next) => {
    const name = req.params.name
    try {
        const community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        const userTitles = await UserTitleModel.find({
            communityId: community._id,
        }).sort({ createdAt: 1 })

        return res.status(200).json(userTitles)
    } catch (error) {
        next(error)
    }
}

module.exports = listUserTitlesController
