const LiveRoomModel = require('../models/LiveRoom')

const createLiveRoom = async (req, res, next) => {
    try {
        const user = req.user
        const visibility = req.body.visibility

        const liveRoom = await LiveRoomModel.create({
            owner: user.username,
            visibility: visibility,
        })

        return res.status(201).json(liveRoom)
    } catch (error) {
        next(error)
    }
}

module.exports = createLiveRoom
