const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const { getUserProducer } = require('../broker/userProducer')

const getCommunityController = async (req, res, next) => {
    const name = req.params.name
    const user = req.user
    try {
        let community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        community = community.toObject()
        if (user) {
            const joinedStatus = await JoinedCommunityModel.findOne({
                userId: user._id,
                communityId: community._id,
            })
            community.joinedStatus = joinedStatus
        }

        community.numMembers = await JoinedCommunityModel.countDocuments({
            communityId: community._id,
        })

        // Moderators information
        const mods = await getUserProducer({ username: community.moderators })
        community.moderators = mods
        return res.status(200).json(community)
    } catch (error) {
        next(error)
    }
}

module.exports = getCommunityController
