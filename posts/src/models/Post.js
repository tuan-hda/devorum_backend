const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    views: {
      type: [
        {
          type: String,
          unique: true,
        },
      ],
      default: [],
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
    closed: {
      type: Boolean,
      default: false,
    },
    closedAt: Date,
    community: String,
  },
  { timestamps: true }
);
PostSchema.plugin(mongoosePaginate);
const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
