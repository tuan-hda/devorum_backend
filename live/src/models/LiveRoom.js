const mongoose = require('mongoose')

const LiveRoomSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            required: true,
        },
        timeout: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const LiveRoomModel = mongoose.model('liveRoom', LiveRoomSchema)

module.exports = LiveRoomModel
