const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const client = require('../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

const createCommunityController = async (req, res, next) => {
    const user = req.user
    const data = {}

    for (const key in req.body) {
        if (key in CommunityModel.schema.paths) {
            data[key] = req.body[key]
        }
    }
    data.createdBy = user._id
    data.moderators = [user.username]

    try {
        const community = new CommunityModel(data)
        const response = await community.save()
        res.status(201).json(response)
        client
            .send(
                new rqs.SetItemValues(
                    response._id,
                    {
                        type: 'community',
                        title: response.title,
                        name: response.name,
                        photo: response.photo,
                        banner: response.banner,
                        description: response.description,
                        scrutinizeToPost: response.scrutinizeToPost,
                    },
                    {
                        // optional parameters:
                        cascadeCreate: true,
                    }
                )
            )
            .then((response) => {
                //handle response
            })
            .catch((error) => {
                //handle error
            })
    } catch (error) {
        if (error?._message?.includes('validation failed')) {
            return next(createHttpError[400](error.errors))
        }
        if (error.code === 11000) {
            return next(createHttpError[400]('Community already exists'))
        }
        next(error)
    }
}

module.exports = createCommunityController
