const UserModel = require('../models/User')

const getCurrentProfile = async (req, res, next) => {
  try {
    const user = req.user
    const profile = await UserModel.findById(user._id)
    return res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentProfile
