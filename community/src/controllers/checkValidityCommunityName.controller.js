const CommunityModel = require('../models/Community')

const checkValidityCommunityName = async (req, res, next) => {
  const name = req.query.name
  try {
    const community = await CommunityModel.findOne({ name })
    if (community) {
      return res.status(200).json({
        isValid: false,
      })
    }
    return res.status(200).json({
      isValid: true,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = checkValidityCommunityName
