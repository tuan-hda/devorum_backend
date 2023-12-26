const checkCommunityExist = require('../services/checkCommunityExist')
const InvitationModel = require('../models/Invitation')

const deleteInvitationController = async (req, res, next) => {
    try {
        const name = req.params.name
        const username = req.params.username

        let community = await checkCommunityExist(name)

        const existInvitation = await InvitationModel.findOne({
            communityId: community._id,
            username: username,
        })

        if (existInvitation) {
            await existInvitation.deleteOne()
        } else {
            return res.status(200).json({ msg: 'Invitation does not exist' })
        }

        res.status(200).json({ msg: 'Deleted invitation successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = deleteInvitationController
