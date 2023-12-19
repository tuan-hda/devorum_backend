const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  desc: {
    type: String,
  },
  author_id: {
    type: String,
    require: true,
  },
});

TagSchema.plugin(mongoose_delete, { deletedAt: true });
const TagModel = mongoose.model("tag", TagSchema);
module.exports = TagModel;
