const mongoose = require('mongoose')

const CommunitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        title: {
            type: String,
        },
        description: {
            type: String,
        },
        rules: {
            type: [String],
        },
        resources: {
            type: [String],
        },
        moderators: {
            type: [String],
            required: true,
        },
        visibility: {
            type: String,
            required: true,
            enum: ['public', 'private'],
            default: 'public',
        },
        scrutinizeToPost: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdBy: {
            type: String,
            required: true,
        },
        banner: {
            type: String,
        },
        photo: {
            type: String,
        },
        allowAligningTitle: {
            type: Boolean,
            default: false,
        },
        allowUsers: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const CommunityModel = mongoose.model('community', CommunitySchema)

module.exports = CommunityModel
