const createError = require('http-errors')
const { validationResult } = require('express-validator')
const FollowSchema = require('../../models/Follow')

const followUserController = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const to = req.body.to
    const from = req.user._id
    const follow = new FollowSchema({
      to: to,
      from,
    })

    const response = await follow.save()
    return res.status(200).json(response)
  } catch (error) {
    if (error.code === 11000) {
      return next(createError[400]('Already followed this user'))
    }
    next(error)
  }
}

module.exports = followUserController
