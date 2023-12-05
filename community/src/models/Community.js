const mongoose = require('mongoose')

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    numMembers: {
      type: String,
      default: 0,
    },
    numPosts: {
      type: String,
      default: 0,
    },
    description: {
      type: String,
    },
    rules: {
      type: [String],
    },
    visibility: {
      type: String,
      required: true,
      enum: ['public', 'private'],
      default: 'public',
    },
    scrutinizeToPost: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const CommunityModel = mongoose.model('community', CommunitySchema)

module.exports = CommunityModel
