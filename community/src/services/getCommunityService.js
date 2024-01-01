const createHttpError = require('http-errors')
const { ObjectId } = require('mongodb')
const CommunityModel = require('../models/Community')

const getCommunityService = async ({ communityId, name }) => {
    if (!communityId && !name) {
        throw createHttpError[400]('Community ID or name is required')
    }

    let matchCondition = {}
    if (communityId) {
        const ids = Array.isArray(communityId)
            ? communityId.map((id) => new ObjectId(id))
            : [new ObjectId(communityId)]
        matchCondition._id = { $in: ids }
    } else if (name) {
        const names = Array.isArray(name) ? name : [name]
        matchCondition.name = { $in: names }
    }

    const communities = await CommunityModel.aggregate([
        {
            $match: matchCondition,
        },
    ])

    if (!communities || communities.length === 0) {
        throw createHttpError[404]('Community not found')
    }

    return communities
}

module.exports = getCommunityService
