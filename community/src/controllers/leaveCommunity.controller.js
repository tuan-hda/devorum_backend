const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const leaveCommunityController = async (req, res, next) => {
    const name = req.params.name
    const user = req.user
    try {
        const community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        const isMember = await JoinedCommunityModel.findOne({
            username: user.username,
            communityId: community._id,
        })

        if (!isMember) {
            throw createHttpError[400]('User is not a member of this community')
        }

        await JoinedCommunityModel.deleteOne({
            username: user.username,
            communityId: community._id,
        })

        return res.status(200).json({ msg: 'Left successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = leaveCommunityController
