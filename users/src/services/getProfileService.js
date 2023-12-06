const createHttpError = require('http-errors')
const { ObjectId } = require('mongodb')
const UserModel = require('../models/User')

const getProfileService = async ({ username, authUser }) => {
  if (!username) {
    throw createHttpError[400]('Missing username')
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
      { $unwind: { preserveNullAndEmptyArrays: true, path: '$followStatus' } },
      { $unwind: { preserveNullAndEmptyArrays: true, path: '$blockStatus' } }
    )
  }

  const user = await UserModel.aggregate([
    {
      $match: {
        username,
      },
    },
    ...lookup,
    { $unset: ['password', 'followStatus.to'] },
  ])

  if (!user || (Array.isArray(user) && user.length === 0)) {
    throw createHttpError[404]('User not found')
  }

  return user[0]
}

module.exports = getProfileService
