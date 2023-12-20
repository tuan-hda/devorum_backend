const express = require('express')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/test', (req, res) => {
    res.status(200).send('ok')
})
router.post(
    '/',
    authenticateJWT,
    require('../controllers/createReport.controller')
)
router.get(
    '/',
    authenticateJWT,
    require('../controllers/listReport.controller')
)
router.put(
    '/:id',
    authenticateJWT,
    require('../controllers/updateReport.controller')
)

module.exports = router
