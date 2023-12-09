const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')

const checkCommunityExist = async (name) => {
    let community = await CommunityModel.findOne({ name })
    if (!community) {
        throw createHttpError[404]('Community not found')
    }
    return community
}

module.exports = checkCommunityExist
