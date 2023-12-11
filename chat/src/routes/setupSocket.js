const MessageModel = require('../models/Message')

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

    socket.on('message', async (data) => {
        console.log('sending message to room', data.room)
        try {
            const message = await MessageModel.create({
                room: data.room,
                from: data.from,
                body: data.body,
            })
            socketIO.to(data.room).emit('messageResponse', message)
        } catch (error) {
            console.log('error sending message to room', error)
        }
    })
}
