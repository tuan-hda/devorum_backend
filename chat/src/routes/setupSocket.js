module.exports = (socketIO, socket) => {
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data)
    })
}
