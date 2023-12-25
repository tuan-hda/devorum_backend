const checkCommunityExist = require('../services/checkCommunityExist')
const InvitationModel = require('../models/Invitation')
const { createNotificationProducer } = require('../broker/notificationProducer')
const config = require('../configs/config')

const inviteController = async (req, res, next) => {
    try {
        const name = req.params.name
        const username = req.body.username

        let community = await checkCommunityExist(name)

        const existInvitation = await InvitationModel.findOne({
            communityId: community._id,
            username: username,
        })

        if (existInvitation) {
            return res.status(200).json({ msg: 'Already invited' })
        }

        const invitation = new InvitationModel({
            communityId: community._id,
            username: username,
        })

        await invitation.save()
        res.status(201).json(invitation)
        createNotificationProducer({
            type: 'community',
            content: `You have been invited to join ${
                community.title || community.name || ''
            }`,
            from: community.name,
            owner: username,
            action: 'invite',
            href: `${config.FRONTEND_DOMAIN}/c/${community.name}`,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = inviteController
