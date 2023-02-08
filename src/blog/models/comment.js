const mongoose = require("mongoose");
const { uuid, jsonSchema } = require("uuidv4");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: {
    require: true,
    type: jsonSchema.v4.type,
    unique: true,
  },
  post: {
    type: jsonSchema.v4.type,
    ref: "Post",
  },
});

module.exports = Comment = mongoose.model("Comment", commentSchema);
