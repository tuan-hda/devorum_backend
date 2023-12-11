const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            default: [],
        },
        replyTo: {
            type: String,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room',
            required: true,
        },
        createdBy: {
            type: String,
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
