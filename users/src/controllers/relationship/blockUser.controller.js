const createError = require('http-errors')
const { validationResult } = require('express-validator')
const BlockModel = require('../../models/Block')
const createHttpError = require('http-errors')

const blockUserController = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const to = req.body.to
    const from = req.user._id

    const prevBlock = await BlockModel.findOne({
      to,
      from,
    })

    if (prevBlock) {
      if (prevBlock.expiresAfter !== undefined && prevBlock.expiresAfter !== null)
        throw new createHttpError[400]("You can't block a user again whom you unblocked for less than 24 hours")
      else throw new createHttpError[400]("You can't block a user again")
    }

    const block = new BlockModel({
      to: to,
      from,
    })

    await block.save()
    return res.status(200).json({ msg: 'Blocked user successfully' })
  } catch (error) {
    if (error.code === 11000) {
      return next(createError[400]('Already followed this user'))
    }
    next(error)
  }
}

module.exports = blockUserController
