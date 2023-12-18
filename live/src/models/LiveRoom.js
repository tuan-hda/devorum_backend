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
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
            required: true,
        },
        accessibleUsers: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const LiveRoomModel = mongoose.model('liveRoom', LiveRoomSchema)

module.exports = LiveRoomModel
