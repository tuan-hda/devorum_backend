const checkCommunityExist = require('../services/checkCommunityExist')
const BanModel = require('../models/Ban')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const banUserController = async (req, res, next) => {
    try {
        const name = req.params.name
        const username = req.body.username

        let community = await checkCommunityExist(name)

        const ban = new BanModel({
            communityId: community._id,
            username: username,
        })

        await ban.save()
        await JoinedCommunityModel.deleteOne({
            communityId: community._id,
            username: username,
        })

        res.status(201).json(ban)
    } catch (error) {
        next(error)
    }
}

module.exports = banUserController
