const { default: mongoose } = require('mongoose')

module.exports = (wss, ws) => {
    wss.broadcast = function broadcast(msg) {
        wss.clients.forEach(function each(client) {
            client.send(msg)
        })
    }

    ws.on('message', (message) => {
        const str = new TextDecoder().decode(message)
        try {
            const data = JSON.parse(str)
            console.log('Received data from client: ', data)
            if ('type' in data) {
                wss.broadcast(JSON.stringify(data))
                console.log('Broadcasted data to all clients: ', data)
            }
        } catch (error) {
            console.log('error parsing json')
        }
    })
}
