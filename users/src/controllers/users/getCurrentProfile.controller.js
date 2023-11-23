const UserModel = require('../../models/User')

const getCurrentProfile = async (req, res, next) => {
  try {
    // const succeed = channel.publish(config.EXCHANGE_NAME, 'users', Buffer.from('hello test publish'), {
    //   deliveryMode: 1,
    //   persistent: false,
    // })

    const user = req.user
    const profile = await UserModel.findById(user._id)
    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentProfile
