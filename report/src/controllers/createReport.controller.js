const ReportModel = require('../models/Report')

const createReportController = async (req, res, next) => {
    try {
        const username = req.user.username
        const description = req.body.description
        const image = req.body.image

        const newReport = new ReportModel({
            description,
            image,
            createdBy: username,
        })

        const report = await newReport.save()
        res.status(201).json(report)
    } catch (error) {
        next(error)
    }
}

module.exports = createReportController
