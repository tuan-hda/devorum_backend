const createError = require('http-errors')
const { validationResult } = require('express-validator')
const FollowSchema = require('../../models/Follow')

const unfollowUserController = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const to = req.params.id
    const from = req.user._id
    const follow = await FollowSchema.findOne({
      to,
      from,
    })

    if (!follow) {
      throw createError[400]('You have not followed this person yet')
    }

    await follow.deleteOne()
    res.status(200).json({
      msg: 'Unfollowed user successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = unfollowUserController
