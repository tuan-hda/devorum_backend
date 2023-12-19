const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    views: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
    },
    votes: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
    },
    author: {
      type: String,
      required: true,
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment",
        },
      ],
      default: [],
    },
    answer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
