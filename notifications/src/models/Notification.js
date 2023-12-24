const mongoose = require('mongoose')
const constants = require('../configs/constants')

const NotificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enums: constants.TYPES,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        from: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: String,
            required: true,
            trim: true,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        action: {
            type: String,
            required: true,
            trim: true,
        },
        href: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

const NotificationModel = mongoose.model('notification', NotificationSchema)

module.exports = NotificationModel
