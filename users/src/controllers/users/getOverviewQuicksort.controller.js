const { ObjectId } = require('mongodb')
const BlockModel = require('../../models/Block')
const FollowModel = require('../../models/Follow')

const getOverviewQuicksortController = async (req, res, next) => {
  try {
    const user = req.user

    const blocks = await BlockModel.find({
      from: new ObjectId(user._id),
    }).count()
    const followers = await FollowModel.find({
      to: new ObjectId(user._id),
    }).count()
    const followings = await FollowModel.find({
      from: new ObjectId(user._id),
    }).count()

    res.status(200).json({
      blocks,
      followers,
      followings,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getOverviewQuicksortController
