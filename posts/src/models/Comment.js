const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    views: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
      default: [],
    },
    votes: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
      default: [],
    },
    user: {
      type: String,
      required: true,
    },
    tags: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tag",
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
