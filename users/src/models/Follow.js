const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

FollowSchema.index({ to: 1, from: 1 }, { unique: true })

const FollowModel = mongoose.model('follow', FollowSchema)

module.exports = FollowModel
