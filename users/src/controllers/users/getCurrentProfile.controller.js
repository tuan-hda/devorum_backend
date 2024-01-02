const BlockModel = require('../../models/Block')
const UserModel = require('../../models/User')
const getCurrentProfile = async (req, res, next) => {
    try {
        const user = req.user
        const lookup = []

        let profile = await UserModel.findById(user._id)
        profile = profile.toObject()
        profile.blocks =
            (
                await BlockModel.find({
                    from: user.username,
                    effective: true,
                })
            )?.map((block) => block.to) || []
        profile.blocks = profile.blocks.filter((block) => block.effective)
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
}

module.exports = getCurrentProfile
