const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
            trim: true,
        },
        resolved: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

const ReportModel = mongoose.model('report', ReportSchema)

module.exports = ReportModel
