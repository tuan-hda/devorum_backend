const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema(
    {
        participants: {
            type: [String],
            required: true,
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
        },
    },
    {
        timestamps: true,
    }
)

const RoomModel = mongoose.model('room', RoomSchema)

module.exports = RoomModel
