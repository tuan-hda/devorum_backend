const checkCommunityExist = require('../services/checkCommunityExist')
const BanModel = require('../models/Ban')

const listBannedUsersController = async (req, res, next) => {
    try {
        const name = req.params.name

        let community = await checkCommunityExist(name)

        const bannedUsers = await BanModel.find({
            communityId: community._id,
        })

        res.status(200).json(bannedUsers)
    } catch (error) {
        next(error)
    }
}

module.exports = listBannedUsersController
