const createHttpError = require('http-errors')
const ReportModel = require('../models/Report')
const { createNotificationProducer } = require('../broker/notificationProducer')

const updateReportController = async (req, res, next) => {
    try {
        const id = req.params.id

        const report = await ReportModel.findById(id)

        if (!report) {
            throw createHttpError[404]('Report not found')
        }

        const resolved = req.body.resolved

        if (report.resolved !== resolved) {
            createNotificationProducer({
                type: 'general',
                from: 'admin',
                action: resolved ? 'resolve report' : 'unresolve report',
                content: `Report with id ${report._id} has been ${
                    resolved ? 'resolved' : 'unresolved'
                }. Report content: ${report.description}`,
                owner: report.createdBy,
                href: '#',
            })
        }

        report.resolved = resolved
        await report.save()

        res.status(200).json({ msg: 'Updated successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = updateReportController
