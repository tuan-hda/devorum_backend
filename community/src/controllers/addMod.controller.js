const createHttpError = require('http-errors')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')

const addModController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const username = req.body.username

        let community = await checkCommunityExist(name)
        await checkCommunityOwner(community, user)

        if (community.moderators.includes(username)) {
            throw createHttpError[400]('User is already a moderator')
        }
        community.moderators.push(username)
        await community.save()

        return res.status(200).json({ msg: 'Added user successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = addModController
