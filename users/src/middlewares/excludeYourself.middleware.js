const createHttpError = require('http-errors')

const excludeYourself = (req, res, next) => {
  try {
    console.log('req.body.to:', req.body.to)
    console.log('req.user._id:', req.user._id)
    if (req.body.to === req.user._id) {
      throw createHttpError[400]("You can't perform this action on yourself")
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = excludeYourself
