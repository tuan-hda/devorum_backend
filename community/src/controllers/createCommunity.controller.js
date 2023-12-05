const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')

const createCommunityController = async (req, res, next) => {
  const user = req.user
  const data = {}

  for (const key in req.body) {
    if (key in CommunityModel.schema.paths) {
      data[key] = req.body[key]
    }
  }
  data.createdBy = user._id
  data.moderators = [user._id]

  try {
    const community = new CommunityModel(data)
    const response = await community.save()
    return res.status(201).json(response)
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

module.exports = createCommunityController
