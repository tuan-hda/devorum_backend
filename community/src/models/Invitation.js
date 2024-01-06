const mongoose = require('mongoose')

const InvitationSchema = new mongoose.Schema(
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

const InvitationModel = mongoose.model('invitation', InvitationSchema)

module.exports = InvitationModel
