const mongoose = require('mongoose')

const BlockSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

BlockSchema.index({ to: 1, from: 1 }, { unique: true })
BlockSchema.index({ expiresAfter: 1 }, { expireAfterSeconds: 0 })

const BlockModel = mongoose.model('block', BlockSchema)

module.exports = BlockModel
