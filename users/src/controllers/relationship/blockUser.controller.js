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
      if (!prevBlock.effective)
        throw new createHttpError[400]("You can't block a user again whom you unblocked for less than 24 hours")
      else throw new createHttpError[400]('You already blocked this person')
    }

    const block = new BlockModel({
      to,
      from,
    })

    await block.save()
    return res.status(200).json({ msg: 'Blocked user successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = blockUserController
