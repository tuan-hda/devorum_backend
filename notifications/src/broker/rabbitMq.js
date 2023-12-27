const amqplib = require('amqplib')
const config = require('../configs/config')

let connection = null

/**
 *
 * @returns {amqplib.Channel}
 */

const connectRabbitMQ = async () => {
  try {
    connection = await amqplib.connect(config.MSG_QUEUE_URL)
    console.log('Created rabbitMQ connection successfully')
  } catch (error) {
    console.log('Create RabbitMQ connection failed:', error)
  }
}

const getChannel = async () => {
  if (connection === null) {
    await connectRabbitMQ()
  }
  return await connection.createChannel()
}

module.exports = {
  connectRabbitMQ,
  getChannel,
}
