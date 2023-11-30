const FollowModel = require('../../models/Follow')

const getFollowInformationController = async (req, res, next) => {
  try {
    const user = req.user

    const followers = await FollowModel.find({
      to: user._id,
    }).populate('from')
    const followings = await FollowModel.find({
      from: user._id,
    }).populate('to')

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
