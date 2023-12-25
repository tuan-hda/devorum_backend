const config = require('../configs/config')
const { v4: uuidv4 } = require('uuid')
const { getChannel } = require('./rabbitMq')

const targetQueueName = 'rpc_notifications_queue'

const createNotificationProducer = async ({
    type,
    content,
    from,
    owner,
    action,
    href,
}) => {
    const channel = await getChannel()
    await channel.assertQueue(config.REPLY_TO_QUEUE_NAME, {
        exclusive: true,
    })

    const payload = {
        action: 'createNotification',
        data: {
            type,
            content,
            from,
            owner,
            action,
            href,
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
        console.log('send message')
        const timeout = setTimeout(() => {
            channel.close()
            resolve('API could not fullfil the request!')
        }, 8000)

        channel.consume(
            config.REPLY_TO_QUEUE_NAME,
            (msg) => {
                clearTimeout(timeout)
                console.log('message response', msg.content.toString())
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

module.exports = { createNotificationProducer }
