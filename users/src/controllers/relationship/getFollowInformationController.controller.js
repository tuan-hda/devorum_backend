const FollowModel = require('../../models/Follow')

const getFollowInformationController = async (req, res, next) => {
    try {
        const user = req.user

        const followers = await FollowModel.aggregate([
            {
                $match: {
                    to: user.username,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'from',
                    foreignField: 'username',
                    as: 'from',
                },
            },
            {
                $unwind: {
                    path: '$from',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unset: ['from.password'],
            },
        ])
        const followings = await FollowModel.aggregate([
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
        // const followers = await FollowModel.find({
        //     to: user.username,
        // }).populate('from')
        // const followings = await FollowModel.find({
        //     from: user.username,
        // })

        res.status(200).json({
            followers: {
                total: followers.length,
                data: followers,
            },
            followings: {
                total: followings.length,
                data: followings,
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getFollowInformationController
