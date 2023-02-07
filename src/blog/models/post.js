const mongoose = require('mongoose');
const { jsonSchema } = require("uuidv4");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
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
    title: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Post = mongoose.model('Post', postSchema);
