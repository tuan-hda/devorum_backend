const BlockModel = require('../../models/Block')

const getBlockInformationController = async (req, res, next) => {
    try {
        const user = req.user

        const blocks = await BlockModel.aggregate([
            {
                $match: {
                    from: user.username,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'to',
                    foreignField: 'username',
                    as: 'to',
                },
            },
            {
                $unwind: {
                    path: '$to',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unset: ['to.password'],
            },
        ])
        // const blocks = await BlockModel.find({
        //     from: user.username,
        //     // effective: true,
        // }).populate('to')

        res.status(200).json({
            total: blocks.length,
            data: blocks,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getBlockInformationController
