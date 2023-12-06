const amqplib = require('amqplib')
const config = require('../configs/config')

let channel = null

/**
 *
 * @returns {amqplib.Channel}
 */
const getChannel = () => {
  return channel
}

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(config.MSG_QUEUE_URL)
    const chan = await connection.createChannel()
    await chan.assertQueue(config.QUEUE_NAME, {
      durable: true,
    })
    console.log('Created rabbitMQ channel successfully')
    channel = chan
  } catch (error) {
    console.log('Create RabbitMQ channel for users error:', error)
  }
}

module.exports = {
  getChannel,
  createChannel,
}
