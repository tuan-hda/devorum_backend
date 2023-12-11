const RoomModel = require('../models/Room')

const listRoomsController = async (req, res, next) => {
    try {
        const user = req.user

        let rooms = await RoomModel.find({
            participants: { $in: [user.username] },
        })
            .populate('lastMessage')
            .sort({ 'lastMessage.createdAt': -1 })

        return res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}

module.exports = listRoomsController
