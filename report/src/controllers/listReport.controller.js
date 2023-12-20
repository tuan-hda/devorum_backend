const ReportModel = require('../models/Report')

const listReportController = async (req, res, next) => {
    try {
        const username = req.query.username

        const filterCriteria = {}
        if (username) {
            filterCriteria.createdBy = username
        }

        const reports = await ReportModel.find(filterCriteria).sort({
            createdAt: -1,
        })

        return res.status(200).json(reports)
    } catch (error) {
        next(error)
    }
}

module.exports = listReportController
