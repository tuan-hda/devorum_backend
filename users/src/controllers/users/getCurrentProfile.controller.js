const config = require('../../configs/config')
const UserModel = require('../../models/User')
const { getChannel } = require('../../utils/rabbitMq')

const getCurrentProfile = async (req, res, next) => {
  const channel = getChannel()
  try {
    const succeed = channel.publish(config.EXCHANGE_NAME, 'users', Buffer.from('hello test publish'), {
      deliveryMode: 1,
      persistent: false,
    })
    // const succeed = channel.sendToQueue('users', Buffer.from('hello rabbitmq'), {
    //   persistent: true,
    //   noAck: false,
    //   timestamp: Date.now(),
    //   contentEncoding: 'utf-8',
    //   contentType: 'text/plain',
    // })
    console.log('Sent: ', succeed)
    const user = req.user
    const profile = await UserModel.findById(user._id)
    res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentProfile
