const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const checkCommunityExist = require('../services/checkCommunityExist')
const checkCommunityOwner = require('../services/checkCommunityOwner')
const client = require('../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

const excludeUpdateFields = new Set([
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
    'createdBy',
    'numMembers',
    'numPosts',
    'name',
    'moderators',
])

const updateCommunityController = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.params.name

        let community = await checkCommunityExist(name)
        checkCommunityOwner(community, user)

        const data = {}
        for (const key in req.body) {
            if (
                key in CommunityModel.schema.paths &&
                !excludeUpdateFields.has(key)
            ) {
                data[key] = req.body[key]
            }
        }
        if (
            Array.isArray(data.moderators) &&
            !data.moderators.includes(user.username)
        ) {
            throw createHttpError[400](
                'Moderators must include the creator of the community'
            )
        }

        community.set(data)
        const finalData = await community.save()

        res.status(200).json({ msg: 'Community updated' })

        client
            .send(
                new rqs.SetItemValues(
                    finalData._id,
                    {
                        type: 'community',
                        title: finalData.title,
                        name: finalData.name,
                        photo: finalData.photo,
                        banner: finalData.banner,
                        description: finalData.description,
                        scrutinizeToPost: finalData.scrutinizeToPost,
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
        next(error)
    }
}

module.exports = updateCommunityController
