const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const joinCommunityController = async (req, res, next) => {
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

        if (isMember) {
            throw createHttpError[400]('User already joined this community')
        }

        const newMember = new JoinedCommunityModel({
            username: user.username,
            communityId: community._id,
        })
        await newMember.save()

        return res.status(200).json({ msg: 'Joined successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = joinCommunityController
