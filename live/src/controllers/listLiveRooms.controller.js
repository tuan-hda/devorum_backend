const LiveRoomModel = require('../models/LiveRoom')

const listLiveRooms = async (req, res, next) => {
    try {
        const liveRooms = await LiveRoomModel.find()
        return res.status(200).json(liveRooms)
    } catch (error) {
        next(error)
    }
}

module.exports = listLiveRooms
