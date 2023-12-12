const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: false,
        },
        likes: {
            type: [String],
            default: [],
        },
        seen: {
            type: [String],
            default: [],
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
            required: false,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room',
            required: true,
        },
        language: {
            type: String,
            required: false,
        },
        mediaUrl: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const MessageModel = mongoose.model('message', MessageSchema)

module.exports = MessageModel
