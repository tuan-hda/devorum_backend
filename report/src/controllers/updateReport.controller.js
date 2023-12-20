const createHttpError = require('http-errors')
const ReportModel = require('../models/Report')

const updateReportController = async (req, res, next) => {
    try {
        const id = req.params.id

        const report = await ReportModel.findById(id)

        if (!report) {
            throw createHttpError[404]('Report not found')
        }

        const resolved = req.body.resolved
        report.resolved = resolved
        await report.save()

        res.status(200).json({ msg: 'Updated successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = updateReportController
