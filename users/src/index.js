const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./configs/config.js')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users.route.js')
const bodyParser = require('body-parser')

// connect db
mongoose.connect(config.DB_CONN_STR)
const connection = mongoose.connection
connection.once('open', () => {
  console.log(new Date(), 'database established successfully')
})

app.use(cors({ origin: config.whitelist, credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', usersRoute)
app.use((err, req, res, _) => {
  console.log(err)
  res.status(500).json({
    error: 'Internal server error',
  })
})

app.listen(config.PORT, () => {
  console.log(new Date(), 'listening on port:', config.PORT)
})
