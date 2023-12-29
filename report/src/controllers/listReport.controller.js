const { getUserProducer } = require('../broker/userProducer')
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

        const createdByUsernames = reports.map((report) => report.createdBy)
        const usersData = await getUserProducer({
            username: createdByUsernames,
        })
        const usersDataDict = usersData.reduce((acc, cur) => {
            acc[cur.username] = cur
            return acc
        }, {})
        const reportsObjectData = reports.map((report) => report.toObject())
        reportsObjectData.forEach((report) => {
            report.createdByData = usersDataDict[report.createdBy]
        })
        console.log(
            'reportsObjectData after add createdByData',
            reportsObjectData
        )

        return res.status(200).json(reportsObjectData)
    } catch (error) {
        next(error)
    }
}

module.exports = listReportController
