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
        trigger: {
            type: String,
            required: true,
            trim: true,
        },
        of: {
            type: String,
            required: true,
            trim: true,
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const NotificationModel = mongoose.model('notification', NotificationSchema)

module.exports = NotificationModel
