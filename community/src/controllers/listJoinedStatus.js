const checkCommunityExist = require('../services/checkCommunityExist')
const BanModel = require('../models/Ban')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const listJoinedStatuses = async (req, res, next) => {
    try {
        const name = req.params.name

        let community = await checkCommunityExist(name)

        const joinedStatuses = await JoinedCommunityModel.find({
            communityId: community._id,
        })
        res.status(200).json(joinedStatuses)
    } catch (error) {
        next(error)
    }
}

module.exports = listJoinedStatuses
