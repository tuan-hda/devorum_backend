const LiveRoomModel = require('../models/LiveRoom')

const updateLiveRoom = async (req, res, next) => {
    try {
        const liveRoom = await LiveRoomModel.findById(req.params.id)
        const isDeleted = req.body.isDeleted

        if (!liveRoom) {
            return res.status(404).json({
                msg: 'Live room not found',
            })
        }

        if (isDeleted) {
            const timeout = setTimeout(async () => {
                await LiveRoomModel.findByIdAndDelete(req.params.id)
            }, 1000 * 60)
            liveRoom.timeout = timeout
            await liveRoom.save()
        } else {
            if (liveRoom.timeout) {
                clearTimeout(liveRoom.timeout)
                liveRoom.timeout = null
                await liveRoom.save()
            }
        }

        return res.status(200).json({
            msg: 'Updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = updateLiveRoom
