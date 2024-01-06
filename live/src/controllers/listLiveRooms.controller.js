const LiveRoomModel = require('../models/LiveRoom')

const listLiveRooms = async (req, res, next) => {
    try {
        const liveRooms = await LiveRoomModel.find().sort({ createdAt: -1 })
        return res.status(200).json(liveRooms)
    } catch (error) {
        next(error)
    }
}

module.exports = listLiveRooms
