const config = require('../configs/config')
const { v4: uuidv4 } = require('uuid')
const { getChannel } = require('./rabbitMq')

const targetQueueName = 'rpc_community_queue'

const getCommunityProducer = async ({ communityId, name }) => {
    const channel = await getChannel()
    await channel.assertQueue(config.REPLY_TO_QUEUE_NAME)

    const payload = {
        action: 'getCommunity',
        data: {
            communityId,
            name,
        },
    }

    if (!channel) {
        console.log('Cannot create channel')
        return
    }
    const id = uuidv4()

    channel.sendToQueue(targetQueueName, Buffer.from(JSON.stringify(payload)), {
        replyTo: config.REPLY_TO_QUEUE_NAME,
        correlationId: id,
    })

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            channel.close()
            resolve('API could not fullfil the request!')
        }, 8000)

        channel.consume(
            config.REPLY_TO_QUEUE_NAME,
            (msg) => {
                clearTimeout(timeout)
                if (msg.properties.correlationId === id) {
                    console.log(msg.content.toString())
                    const response = JSON.parse(msg.content.toString())
                    if (response.error) {
                        reject(response.error)
                    } else {
                        resolve(response.data)
                    }
                } else {
                    reject(new Error('Data not found'))
                }
                channel.close()
            },
            { noAck: true }
        )
    })
}

module.exports = { getCommunityProducer }
