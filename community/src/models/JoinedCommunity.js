const mongoose = require('mongoose')

const JoinedCommunitySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        communityId: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'member',
        },
        title: {
            type: String,
            required: false,
        },
        mute: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const JoinedCommunityModel = mongoose.model(
    'joinedCommunity',
    JoinedCommunitySchema
)

module.exports = JoinedCommunityModel
