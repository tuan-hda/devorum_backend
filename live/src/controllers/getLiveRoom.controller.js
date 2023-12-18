const createHttpError = require('http-errors')
const LiveRoomModel = require('../models/LiveRoom')

const getLiveRoom = async (req, res, next) => {
    try {
        const liveRoom = await LiveRoomModel.findById(req.params.id)
        if (!liveRoom) {
            throw createHttpError[404]('Live room not found')
        }
        return res.status(200).json(liveRoom)
    } catch (error) {
        next(error)
    }
}

module.exports = getLiveRoom
