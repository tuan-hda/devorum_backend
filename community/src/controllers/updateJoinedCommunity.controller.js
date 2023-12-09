const createHttpError = require('http-errors')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')
const checkUserTitleExistInCommunity = require('../services/checkUserTitleExistInCommunity')

const updateJoinedCommunityController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const username = req.params.username
        const { role, title } = req.body

        let community = await checkCommunityExist(name)
        checkCommunityOwner(community, user)

        const joinedStatus = await JoinedCommunityModel.findOne({
            username: username,
            communityId: community._id,
        })
        if (!joinedStatus) {
            throw createHttpError[404]('Joined community not found')
        }

        await checkUserTitleExistInCommunity(community, title)

        joinedStatus.set({
            role: role || joinedStatus.role,
            title: title || joinedStatus.title,
        })
        await joinedStatus.save()

        return res.status(200).json({ msg: 'Joined community updated' })
    } catch (error) {
        console.log('trigger catch')
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        next(error)
    }
}

module.exports = updateJoinedCommunityController
