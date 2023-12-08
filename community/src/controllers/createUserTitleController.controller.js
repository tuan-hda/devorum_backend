const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const UserTitleModel = require('../models/UserTitle')

const createUserTitleController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name
        const {
            name: titleName,
            description,
            backgroundColor,
            textColor,
        } = req.body

        let community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        if (!user) {
            throw createHttpError[401]('Unauthorized')
        }
        if (user._id != community.createdBy) {
            throw createHttpError[403]('Forbidden')
        }

        const newUserTitle = new UserTitleModel({
            name: titleName,
            description,
            backgroundColor,
            textColor,
            communityId: community._id,
        })
        const response = await newUserTitle.save()

        return res.status(201).json(response)
    } catch (error) {
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        next(error)
    }
}

module.exports = createUserTitleController
