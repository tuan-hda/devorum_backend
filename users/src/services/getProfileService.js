const createHttpError = require('http-errors')
const { ObjectId } = require('mongodb')
const UserModel = require('../models/User')

const getProfileService = async ({ username, id, authUser }) => {
    if (!username && !id) {
        throw createHttpError[400]('Must contain username or id')
    }

    const lookup = []
    if (authUser) {
        lookup.push(
            {
                $lookup: {
                    as: 'followStatus',
                    from: 'follows',
                    foreignField: 'to',
                    localField: '_id',
                    pipeline: [
                        {
                            $match: {
                                from: new ObjectId(authUser._id),
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    as: 'blockStatus',
                    from: 'blocks',
                    foreignField: 'to',
                    localField: '_id',
                    pipeline: [
                        {
                            $match: {
                                from: new ObjectId(authUser._id),
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: '$followStatus',
                },
            },
            {
                $unwind: {
                    preserveNullAndEmptyArrays: true,
                    path: '$blockStatus',
                },
            }
        )
    }

    const usernames = typeof username === 'string' ? [username] : username
    const ids = typeof id === 'string' ? [id] : id

    const exprOrConditions = []
    if (usernames) {
        exprOrConditions.push({
            $in: ['$username', usernames],
        })
    }
    if (ids) {
        exprOrConditions.push({
            $in: ['$_id', ids.map((id) => new ObjectId(id))],
        })
    }

    const users = await UserModel.aggregate([
        {
            $match: {
                $expr: {
                    $or: exprOrConditions,
                },
            },
        },
        ...lookup,
        { $unset: ['password', 'followStatus.to'] },
    ])

    if (!users || (Array.isArray(users) && users.length === 0)) {
        throw createHttpError[404]('User not found')
    }

    return users
}

module.exports = getProfileService
