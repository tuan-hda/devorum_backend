const checkCommunityExist = require('../services/checkCommunityExist')
const BanModel = require('../models/Ban')

const deleteBanUserController = async (req, res, next) => {
    try {
        const name = req.params.name
        const username = req.params.username

        let community = await checkCommunityExist(name)

        await BanModel.deleteOne({
            communityId: community._id,
            username: username,
        })

        res.status(200).json({ message: 'User ban has been deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = deleteBanUserController
