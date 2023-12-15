const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('olá mundo')
})

module.exports = router
