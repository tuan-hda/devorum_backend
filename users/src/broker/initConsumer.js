const amqplib = require('amqplib')
const getProfileService = require('../services/getProfileService')
const config = require('../configs/config')
const { getChannel } = require('./rabbitMq')

const ACTIONS = {
  getUser: getProfileService,
}

/**
 *
 * @param {amqplib.Channel} channel
 */
const initConsumer = async () => {
  const channel = await getChannel()
  channel.prefetch(1)
  await channel.assertQueue(config.RPC_QUEUE_NAME, {
    durable: false,
  })

  channel.consume(
    config.RPC_QUEUE_NAME,
    async (msg) => {
      if (!msg) {
        return
      }

      // Init response data
      let responseData = null

      try {
        // Parse payload from message
        const payload = JSON.parse(msg.content.toString())
        const { action, data } = payload

        // Check if action is valid
        if (!(action in ACTIONS)) {
          return
        }

        // Perform some operation based on action
        const result = await ACTIONS[action](data)
        // Set response data if success
        responseData = {
          data: result,
          error: null,
        }
      } catch (error) {
        // Set error if failed
        responseData = {
          data: null,
          error: String(error),
        }
      } finally {
        // Send and ack message
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(responseData)), {
          correlationId: msg.properties.correlationId,
        })
        channel.ack(msg)
      }
    },
    { noAck: false }
  )
}

module.exports = initConsumer
