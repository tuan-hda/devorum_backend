module.exports = (socketIO, socket) => {
    socket.on('join', (data) => {
        console.log('Join notification room:', data)
        socket.join(data.room)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
}
