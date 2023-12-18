const LiveRoomModel = require('../models/LiveRoom')
const createHttpError = require('http-errors')

const updateLiveRoomService = async (
    id,
    isDeleted,
    visibility,
    accessibleUsers
) => {
    const liveRoom = await LiveRoomModel.findById(id)

    if (!liveRoom) {
        throw createHttpError[404]('Live room not found')
    }

    if (isDeleted) {
        const timeout = setTimeout(async () => {
            await LiveRoomModel.findByIdAndDelete(id)
        }, 1000 * 60)
        liveRoom.timeout = timeout
    } else {
        if (liveRoom.timeout) {
            clearTimeout(liveRoom.timeout)
            liveRoom.timeout = null
        }
    }

    if (visibility) {
        liveRoom.visibility = visibility
    }

    if (accessibleUsers) {
        liveRoom.accessibleUsers = accessibleUsers
    }

    await liveRoom.save()
}

module.exports = updateLiveRoomService
