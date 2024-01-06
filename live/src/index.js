const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./configs/config.js')
const mongoose = require('mongoose')
const liveRoute = require('./routes/live.route.js')
const bodyParser = require('body-parser')
const { isHttpError } = require('http-errors')
const WebSocket = require('ws')
const setupSocket = require('./routes/setupSocket.js')
const wss = new WebSocket.Server({ noServer: true })
const setupWSConnection = require('./websocket/util.js').setupWSConnection
// const WebSocket = require('ws')
// const { heartbeat } = require('./websocket/util.js')
// const wss = new WebSocket.Server({ noServer: true })
// const setupWSConnection = require('./websocket/util.js').setupWSConnection

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p)
    })
    .on('uncaughtException', (err) => {
        console.error(err, 'Uncaught Exception thrown')
        process.exit(1)
    })

// connect db
mongoose.connect(config.DB_CONN_STR)
const connection = mongoose.connection
connection.once('open', () => {
    console.log(new Date(), 'database established successfully')
})

app.use(cors({ origin: config.whitelist, credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(liveRoute)

app.use((err, req, res, next) => {
    if (isHttpError(err) && err.statusCode < 500) {
        return res.status(err.statusCode).json({
            msg: err.message,
        })
    }

    if (err.kind === 'ObjectId') {
        return res.status(400).json({
            msg: 'Invalid id',
        })
    }

    console.log(err)
    res.status(500).json({
        msg: 'Internal server error',
    })
})

const server = app.listen(config.PORT, () => {
    console.log(new Date(), 'listening on port:', config.PORT)
})

wss.on('connection', function connection(ws, req, data) {
    setupWSConnection(ws, req, data)
    console.log('Connect')
    setupSocket(wss, ws, req, data)
})

server.on('upgrade', (request, socket, head) => {
    const handleAuth = (ws) => {
        wss.emit('connection', ws, request)
    }
    wss.handleUpgrade(request, socket, head, handleAuth)
})
