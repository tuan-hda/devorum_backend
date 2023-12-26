const mongoose = require('mongoose')

const BanSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        communityId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const BanModel = mongoose.model('ban', BanSchema)

module.exports = BanModel
