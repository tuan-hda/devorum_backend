const createHttpError = require('http-errors')

const checkCommunityOwner = (community, user) => {
    if (!user) {
        throw createHttpError[401]('Unauthorized')
    }
    if (user._id != community.createdBy) {
        throw createHttpError[403]('Forbidden')
    }
}

module.exports = checkCommunityOwner
