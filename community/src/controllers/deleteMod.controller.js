const createHttpError = require('http-errors')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')
const { getUserProducer } = require('../broker/userProducer')

const deleteModController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const username = req.params.username

        let community = await checkCommunityExist(name)
        await checkCommunityOwner(community, user)

        let userData = await getUserProducer({ username })
        console.log(userData)
        if (Array.isArray(userData) && userData.length > 0) {
            userData = userData[0]
        }
        if (community.createdBy === userData._id) {
            throw createHttpError[400]('Cant remove owner from mod list')
        }

        if (!community.moderators.includes(username)) {
            throw createHttpError[400]('User is not a moderator')
        }
        community.moderators = community.moderators.filter(
            (mod) => mod !== username
        )
        await community.save()

        return res.status(200).json({ msg: 'Deleted mod successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = deleteModController
