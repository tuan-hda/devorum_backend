const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema(
    {
        to: {
            type: String,
            ref: 'user',
            required: true,
        },
        from: {
            type: String,
            ref: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

FollowSchema.index({ to: 1, from: 1 }, { unique: true })

const FollowModel = mongoose.model('follow', FollowSchema)

module.exports = FollowModel
