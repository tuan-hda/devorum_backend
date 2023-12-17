const { default: mongoose } = require('mongoose')
const MessageModel = require('../models/Message')
const RoomModel = require('../models/Room')

let joinDevs = {}

module.exports = (socketIO, socket) => {
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data)
    })

    socket.on('joinRooms', (data) => {
        console.log('joining rooms', data)
        if (!Array.isArray(data))
            return socketIO.emit('joinRoomsResponse', {
                error: 'Invalid data',
            })

        data.forEach((room) => {
            socket.join(room)
        })
    })

    socket.on('joinRoomDev', (data) => {
        console.log('joining room dev', data)

        socket.join(data.room)
        joinDevs[data.room] = { ...joinDevs[data.room] }
        joinDevs[data.room][socket.id] = data
        socketIO.emit('joinRoomDevResponse', joinDevs)
    })

    socket.on('message', async (data) => {
        console.log('sending message to room', data.room)
        try {
            const message = await MessageModel.create(data)
            await RoomModel.updateOne(
                {
                    _id: message.room,
                },
                {
                    $set: {
                        lastMessage: message._id,
                        lastMessageAt: message.createdAt,
                    },
                }
            )
            socketIO
                .to(data.room)
                .emit('messageResponse', { message, type: 'append' })
        } catch (error) {
            console.log('error sending message to room', error)
        }
    })

    socket.on('likeMessage', async (data) => {
        console.log('like message')
        try {
            const message = await MessageModel.findOne({
                _id: new mongoose.Types.ObjectId(data._id),
            })

            if (!message) {
                return
            }

            if (message.likes.includes(data.username)) {
                message.likes = message.likes.filter((m) => m !== data.username)
            } else {
                message.likes.push(data.username)
            }

            await message.save()

            socketIO
                .to(message.room.toHexString())
                .emit('messageResponse', { message, type: 'update' })
            console.log(
                'liked success, sending message to room',
                message.room.toHexString()
            )
        } catch (error) {
            console.log('error liking message', error)
        }
    })

    socket.on('seenMessage', async (data) => {
        console.log('seen message')
        try {
            const message = await MessageModel.findOne({
                _id: new mongoose.Types.ObjectId(data._id),
            })

            if (!message) {
                return
            }

            if (message.seen?.includes(data.username)) {
                return
            }
            if (message.seen) message.seen.push(data.username)
            else message.seen = [data.username]

            await message.save()
            await RoomModel.updateOne(
                {
                    _id: message.room,
                },
                {
                    $set: {
                        lastAction: 'seen',
                    },
                }
            )
            socketIO
                .to(message.room.toHexString())
                .emit('messageResponse', { message, type: 'update' })
            console.log(
                'update seen success, sending update to room',
                message.room.toHexString()
            )
        } catch (error) {
            console.log('error update seen message', error)
        }
    })

    socket.on('typing', async (data) => {
        console.log('send typing state')
        try {
            socketIO.to(data.room).emit('typingResponse', {
                ...data,
                isTyping: true,
            })
            console.log('send typing state success')
        } catch (error) {
            console.log('error sending typing state', error)
        }
    })

    socket.on('stopTyping', async (data) => {
        console.log('send stop typing state')
        try {
            socketIO.to(data.room).emit('typingResponse', {
                ...data,
                isTyping: false,
            })
            console.log('send stop typing state')
        } catch (error) {
            console.log('error sending stop typing state', error)
        }
    })

    socket.on('disconnect', () => {
        Object.keys(joinDevs).forEach((room) => {
            if (joinDevs[room][socket.id]) {
                delete joinDevs[room][socket.id]
                console.log('deleted,', joinDevs[room])
                socketIO.emit('joinRoomDevResponse', joinDevs)
            }
        })

        console.log('user disconnected')
    })
}
