const LiveRoomModel = require('../models/LiveRoom')

const createLiveRoom = async (req, res, next) => {
    try {
        const user = req.user

        const liveRoom = await LiveRoomModel.create({
            owner: user.username,
        })

        return res.status(201).json(liveRoom)
    } catch (error) {
        next(error)
    }
}

module.exports = createLiveRoom
