const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        votes: {
            type: [String],
            default: [],
        },
        author: {
            type: String,
            required: true,
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const CommentModel = mongoose.model('comment', CommentSchema)
module.exports = CommentModel
