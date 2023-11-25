const BlockModel = require('../../models/Block')

const getBlockInformationController = async (req, res, next) => {
  try {
    const user = req.user

    const blocks = await BlockModel.find({
      from: user._id,
      // effective: true,
    }).populate('to')

    res.status(200).json({
      total: blocks.length,
      data: blocks,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getBlockInformationController
