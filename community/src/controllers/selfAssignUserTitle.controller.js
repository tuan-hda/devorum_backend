const createHttpError = require('http-errors')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')
const checkUserTitleExistInCommunity = require('../services/checkUserTitleExistInCommunity')

const selfUpdateCommunityStatusController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const title = req.body.title
        const mute = req.body.mute

        let community = await checkCommunityExist(name)
        checkCommunityOwner(community, user)

        if (!community.allowAligningTitle && title) {
            throw createHttpError[400](
                'Community does not allow aligning title yourself'
            )
        }

        const joinedStatus = await JoinedCommunityModel.findOne({
            username: user.username,
            communityId: community._id,
        })
        if (!joinedStatus) {
            throw createHttpError[404]('User not found in community')
        }

        if (title) {
            await checkUserTitleExistInCommunity(community, title)
        }

        joinedStatus.set({
            title: title ?? joinedStatus.title,
            mute: mute ?? joinedStatus.mute,
        })
        await joinedStatus.save()

        return res.status(200).json({ msg: 'Self assigned successfully' })
    } catch (error) {
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        next(error)
    }
}

module.exports = selfUpdateCommunityStatusController
