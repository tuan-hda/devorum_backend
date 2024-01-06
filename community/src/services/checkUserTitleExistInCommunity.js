const createHttpError = require('http-errors')
const UserTitleModel = require('../models/UserTitle')

const checkUserTitleExistInCommunity = async (community, userTitleId) => {
    const userTitle = await UserTitleModel.findOne({
        _id: userTitleId,
        communityId: community._id,
    })
    if (!userTitle) {
        throw createHttpError[404]('User title not found')
    }
    return userTitle
}

module.exports = checkUserTitleExistInCommunity
