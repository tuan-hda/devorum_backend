const { default: mongoose } = require('mongoose')
const { getYDoc } = require('../websocket/util')
const { v4: uuidv4 } = require('uuid')
const updateLiveRoomService = require('../services/updateLiveRoomService')
let joinDevs = {}

const colors = [
    '#FFF0F5',
    '#FF00FF',
    '#CD5C5C',
    '#CD853F',
    '#9400D3',
    '#F0E68C',
    '#DC143C',
    '#FFFFF0',
    '#6B8E23',
    '#66CDAA',
]

const findColor = (room) => {
    const colorsOccupied = Object.values(joinDevs[room]).map((dev) => dev.color)
    return colors.filter((color) => colorsOccupied.indexOf(color) === -1)[0]
}

module.exports = (wss, ws, req, data) => {
    const uuid = uuidv4()

    const docName = req.url.slice(1).split('?')[0]
    // const doc = getYDoc(docName, true)

    joinDevs[docName] = { ...joinDevs[docName] }
    joinDevs[docName][uuid] = {
        color: findColor(docName),
        ws: ws,
    }
    updateLiveRoomService(docName, false)

    wss.broadcastToRoom = function broadcast(room, msg) {
        Object.values(joinDevs[room]).forEach((dev) => {
            dev.ws.send(new TextEncoder().encode(msg).buffer)
        })
        // })
    }

    // doc.awareness.on('update', ({ added, updated, removed }) => {
    //     console.log('Awareness update', added, updated, removed)
    // })

    ws.on('message', (message) => {
        const str = new TextDecoder().decode(message)
        try {
            const data = JSON.parse(str)
            console.log('Received data from client: ', data)
            if ('type' in data) {
                wss.broadcastToRoom(docName, JSON.stringify(data))
                console.log('Broadcasted data to all clients: ', data)
            }
        } catch (_) {
            //
        }
    })

    ws.addEventListener('close', async function (event) {
        if (!joinDevs[docName][uuid]) return
        // Check number of devs in room to schedule destruction
        if (Object.keys(joinDevs[docName]).length === 1) {
            console.log('Destroy room after 5 mins', docName)
            delete joinDevs[docName][uuid]
            updateLiveRoomService(docName, true)
        } else delete joinDevs[docName][uuid]
        wss.broadcastToRoom(
            docName,
            JSON.stringify({
                type: 'updateUsersInRoom',
                users: Object.values(joinDevs[docName]).map((dev) => ({
                    color: dev.color,
                    awarenessId: dev.awarenessId,
                })),
            })
        )
    })
}
