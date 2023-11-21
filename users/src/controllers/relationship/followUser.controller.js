const createError = require('http-errors')
const { validationResult } = require('express-validator')
const FollowModel = require('../../models/Follow')

const followUserController = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const to = req.body.to
    const from = req.user._id
    const follow = new FollowModel({
      to: to,
      from,
    })

    await follow.save()
    return res.status(200).json({ msg: 'Followed user successfully' })
  } catch (error) {
    if (error.code === 11000) {
      return next(createError[400]('Already followed this user'))
    }
    next(error)
  }
}

module.exports = followUserController
