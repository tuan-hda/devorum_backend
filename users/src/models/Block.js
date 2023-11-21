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
    effective: {
      type: Boolean,
      required: true,
      default: true,
    },
    expiresAfter: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

BlockSchema.index({ to: 1, from: 1 }, { unique: true })
BlockSchema.index({ expiresAfter: 1 }, { expireAfterSeconds: 1 })

const BlockModel = mongoose.model('block', BlockSchema)

module.exports = BlockModel
