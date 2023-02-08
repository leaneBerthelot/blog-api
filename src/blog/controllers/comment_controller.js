const Comment = require("../models/comment");
const Post = require("../models/post");

const { uuid } = require("uuidv4");
const createComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = new Comment({ ...req.body, post: id });

    req.post.commentsCount++;
    comment.id = uuid();

    await Promise.all([req.post.save(), comment.save()]);

    res.status(201).json({ msg: "Create comment" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ id: req.params.id });
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    const post = await Post.findOne({ id: comment.post }).exec();
    post.commentsCount--;
    await post.save();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllComments = async (req, res) => {
  const { id } = req.params;

  const comments = await Comment.find({ post: id }).lean().exec();

  res.status(200).json(comments);
};

module.exports = {
  createComment,
  deleteComment,
  getAllComments,
};
