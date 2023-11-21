const FollowModel = require('../../models/Follow')

const getFollowInformationController = async (req, res, next) => {
  try {
    const user = req.user

    const following = await FollowModel.find({
      from: user._id,
    })
    const followers = await FollowModel.find({
      to: user._id,
    })

    res.status(200).json({
      followed: {
        total: following.length,
        data: following,
      },
      follows: {
        total: followers.length,
        data: followers,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getFollowInformationController
