const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        content: String,
        votes: {
            type: [String],
            default: [],
        },
        comments: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'comment',
                },
            ],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
        closed: {
            type: Boolean,
            default: false,
        },
        closedAt: Date,
        community: String,
        bookmark: {
            type: [String],
            default: [],
        },
        state: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
            required: true,
        },
    },
    { timestamps: true }
)
PostSchema.plugin(mongoosePaginate)
const PostModel = mongoose.model('post', PostSchema)
module.exports = PostModel
