const jwt = require('jsonwebtoken')
const config = require('../configs/config')

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

const authenticateJWT = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'No bearer token provided',
    })
  }

  const accessToken = authorization.slice(7)

  jwt.verify(accessToken, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        msg: 'Invalid token',
      })
    }

    req.user = user
    next()
  })
}

module.exports = {
  generateToken,
  authenticateJWT,
}
