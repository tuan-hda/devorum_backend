const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const { getUserProducer } = require('../broker/userProducer')
const UserTitleModel = require('../models/UserTitle')

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
                username: user.username,
                communityId: community._id,
            })
            if (joinedStatus) {

                community.joinedStatus = joinedStatus.toObject()
            }
        }

        community.numMembers = await JoinedCommunityModel.countDocuments({
            communityId: community._id,
        })

        if (community.joinedStatus?.title) {
            community.joinedStatus.title = await UserTitleModel.findById(
                community.joinedStatus.title
            )
        }

        // Moderators information
        const mods = await getUserProducer({ username: community.moderators })
        community.moderators = mods
        return res.status(200).json(community)
    } catch (error) {
        next(error)
    }
}

module.exports = getCommunityController
