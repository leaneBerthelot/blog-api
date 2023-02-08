const mongoose = require("mongoose");
const { jsonSchema } = require("uuidv4");

const postSchema = new mongoose.Schema({
  commentsCount: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: jsonSchema.v4,
  title: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("Post", postSchema);
