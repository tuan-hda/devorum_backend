const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const listAllCommunities = async (req, res, next) => {
    try {
        let communities = await CommunityModel.find()
        return res.status(200).json(communities)
    } catch (error) {
        next(error)
    }
}

module.exports = listAllCommunities
