const { validationResult } = require('express-validator')
const UserModel = require('../../models/User')

const registerUser = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const data = {}
    for (let [key, value] of Object.entries(req.body)) {
      data[key] = value
    }
    delete data.points

    const newUser = new UserModel(data)
    const result = await newUser.save()

    res.status(201).json(result)
  } catch (error) {
    if ('code' in error && error.code === 11000) {
      return res.status(400).json({
        errors: [
          {
            type: 'field',
            msg: `${Object.keys(error.keyPattern).at(0)} already exists`,
            path: Object.keys(error.keyPattern).at(0),
            location: 'body',
          },
        ],
      })
    }
    next(error)
  }
}

module.exports = registerUser
