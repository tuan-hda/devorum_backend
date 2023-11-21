const { ObjectId } = require('mongodb')
const UserModel = require('../../models/User')
const express = require('express')
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @returns
 */
const getProfile = async (req, res, next) => {
  try {
    const username = req.params.username
    const authUser = req.user

    if (!username) {
      return res.status(400).json({
        msg: 'Missing username',
      })
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
        { $unwind: { preserveNullAndEmptyArrays: true, path: '$followStatus' } }
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
      return res.status(404).json({
        msg: 'User not found',
      })
    }

    res.status(200).json(user[0])
  } catch (error) {
    next(error)
  }
}

module.exports = getProfile
