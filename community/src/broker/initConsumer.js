const amqplib = require('amqplib')
const getCommunityService = require('../services/getCommunityService')
const config = require('../configs/config')
const { getChannel } = require('./rabbitMq')

const ACTIONS = {
    getCommunity: getCommunityService,
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
            console.log('user channel received message')
            if (!msg) {
                return
            }

            // Init response data
            let responseData = null

            console.log('processing message')
            try {
                // Parse payload from message
                const payload = JSON.parse(msg.content.toString())
                console.log('message payload', payload)
                const { action, data } = payload

                // Check if action is valid
                if (!(action in ACTIONS)) {
                    console.log('action not found', action)
                    return
                }

                // Perform some operation based on action
                console.log('perform action', action)
                console.time('perform-action')
                const result = await ACTIONS[action](data)
                console.timeEnd('perform-action')

                // Set response data if success
                responseData = {
                    data: result,
                    error: null,
                }
                console.log('response data', responseData)
            } catch (error) {
                // Set error if failed
                responseData = {
                    data: null,
                    error: String(error),
                }
                console.log('failed when performing action', responseData)
            } finally {
                // Send and ack message
                console.log('send response data')
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(responseData)),
                    {
                        correlationId: msg.properties.correlationId,
                    }
                )
                channel.ack(msg)
                console.log('end processing message')
            }
        },
        { noAck: false }
    )
}

module.exports = initConsumer
