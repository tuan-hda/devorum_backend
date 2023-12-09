const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const UserTitleModel = require('../models/UserTitle')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')
const checkUserTitleExistInCommunity = require('../services/checkUserTitleExistInCommunity')

const updateUserTitleController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const id = req.params.id

        const {
            name: titleName,
            description,
            backgroundColor,
            textColor,
        } = req.body

        let community = await checkCommunityExist(name)
        checkCommunityOwner(community, user)

        const userTitle = await checkUserTitleExistInCommunity(community, id)
        userTitle.set({
            name: titleName || userTitle.name,
            description: description || userTitle.description,
            backgroundColor: backgroundColor || userTitle.backgroundColor,
            textColor: textColor || userTitle.textColor,
        })
        await userTitle.save()

        return res.status(200).json({ msg: 'User title updated' })
    } catch (error) {
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        next(error)
    }
}

module.exports = updateUserTitleController
