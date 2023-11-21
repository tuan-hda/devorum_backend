const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const createHttpError = require('http-errors')

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  }
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '1d',
  })
}

const authenticateJWT = (req, res, next, allowFail = false) => {
  const authorization = req.header('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    if (allowFail) {
      return next()
    } else {
      throw createHttpError(401)('No bearer token provided')
    }
  }

  const accessToken = authorization.slice(7)

  jwt.verify(accessToken, config.JWT_SECRET, (err, user) => {
    if (err) {
      throw createHttpError[403]('Invalid token')
    }

    req.user = user
    next()
  })
}

module.exports = {
  generateToken,
  authenticateJWT,
}
