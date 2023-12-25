const checkCommunityExist = require('../services/checkCommunityExist')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const createHttpError = require('http-errors')

const removeUserFromCommunity = async (req, res, next) => {
    try {
        const name = req.params.name
        const username = req.params.username

        let community = await checkCommunityExist(name)

        const joinedCommunity = await JoinedCommunityModel.findOne({
            communityId: community._id,
            username: username,
        })

        if (!joinedCommunity) {
            throw createHttpError[404]('User not found in this community')
        }

        await joinedCommunity.deleteOne()
        res.status(200).json({
            message: 'Removed user from community',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = removeUserFromCommunity
