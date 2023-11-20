const { body } = require('express-validator')

module.exports = {
  validateNewFollow: () => {
    return [body('to').notEmpty().withMessage('Follow person is required')]
  },
  validateNewBlock: () => {
    return [body('to').notEmpty().withMessage('Block person is required')]
  },
}
