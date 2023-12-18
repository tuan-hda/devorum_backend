const updateLiveRoomService = require('../services/updateLiveRoomService')

const updateLiveRoom = async (req, res, next) => {
    try {
        const id = req.params.id
        const isDeleted = req.body.isDeleted
        const visibility = req.body.visibility
        const accessibleUsers = req.body.accessibleUsers

        await updateLiveRoomService(id, isDeleted, visibility, accessibleUsers)

        return res.status(200).json({
            msg: 'Updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = updateLiveRoom
