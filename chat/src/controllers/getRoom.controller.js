const RoomModel = require('../models/Room')

const getRoomController = async (req, res, next) => {
    try {
        const username = req.body.username
        const user = req.user

        let room = await RoomModel.findOne({
            participants: { $all: [username, user.username] },
        })

        if (room) {
            return res.status(400).json({
                error: 'Room already exists',
            })
        }

        room = await RoomModel.create({
            participants: [username, user.username],
        })

        return res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

module.exports = getRoomController
