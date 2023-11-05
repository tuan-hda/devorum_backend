const { validationResult } = require('express-validator')
const UserModel = require('../models/User')
const { generateToken } = require('../middlewares/auth.middleware')

const login = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const email = req.body.email
    const password = req.body.password
    const user = await UserModel.findOne({
      email,
    })

    if (!user) {
      return res.status(401).json({
        msg: 'Authentication failed. User not found',
      })
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        msg: 'Authentication failed. Incorrect password.',
      })
    }

    const token = generateToken(user)

    return res.status(200).json({
      _id: user._id,
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
