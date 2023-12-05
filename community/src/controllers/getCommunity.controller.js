const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')

const getCommunityController = async (req, res, next) => {
  const name = req.params.name

  try {
    const community = await CommunityModel.findOne({ name })
    // return res.status(201).json(response)
  } catch (error) {
    if (error?._message?.includes('validation failed')) {
      return next(createHttpError[400](error.errors))
    }
    if (error.code === 11000) {
      return next(createHttpError[400]('Community already exists'))
    }
    next(error)
  }
}

module.exports = getCommunityController
