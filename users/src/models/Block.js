const mongoose = require('mongoose')

const BlockSchema = new mongoose.Schema(
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
        effective: {
            type: Boolean,
            required: true,
            default: true,
        },
        expiresAfter: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

BlockSchema.index({ to: 1, from: 1 }, { unique: true })
BlockSchema.index({ expiresAfter: 1 }, { expireAfterSeconds: 1 })

const BlockModel = mongoose.model('block', BlockSchema)

module.exports = BlockModel
