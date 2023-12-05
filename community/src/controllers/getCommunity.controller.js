const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')

const getCommunityController = async (req, res, next) => {
  const name = req.params.name
  try {
    const community = await CommunityModel.findOne({ name })
    if (!community) {
      throw createHttpError[404]('Community not found')
    }
    return res.status(200).json(community)
  } catch (error) {
    next(error)
  }
}

module.exports = getCommunityController
