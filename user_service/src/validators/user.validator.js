const { body } = require('express-validator')

module.exports = {
  validateNewUser: () => {
    return [
      body('email').notEmpty().withMessage('Email must not be empty').isEmail().withMessage('Invalid email'),
      body('username').notEmpty().withMessage('Username must not be empty'),
      body('password')
        .notEmpty()
        .withMessage('Password must not be empty')
        .isLength({
          min: 8,
        })
        .withMessage('Password must be at least 8 characters'),
    ]
  },
  validateLogin: () => {
    return [
      body('email').notEmpty().withMessage('Email must not be empty'),
      body('password').notEmpty().withMessage('Password must not be empty'),
    ]
  },
}
