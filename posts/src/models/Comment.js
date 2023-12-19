const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
