const Post = require("../models/post");
const { uuid } = require("uuidv4");
const { removeFields } = require("../../../utils/remover");
const RESPONSE_MESSAGES = require("../../../__constants__/response_messages");

const createPost = async (req, res) => {
  const post = new Post(req.body);

  try {
    post.id = uuid();
    await post.save();

    res.header("Location", `http://localhost:3000/blog/posts/${post.id}`);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.find({}).lean().exec();

    res.status(200).json(removeFields(posts));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ id: id }).lean().exec();
    if (!post) {
      return res.status(404).json({ msg: RESPONSE_MESSAGES.POST_NOT_FOUND });
    }

    res.status(200).json(removeFields(post));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await Promise.all([Post.deleteOne({ id: req.post.id }), Comment.deleteMany({ post: req.params.id })]);

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  const update = {
    ...req.body,
    updatedAt: Date.now(),
  };

  try {
    const post = await Post.findOneAndUpdate({ id }, update, {
      new: true,
      runValidators: true,
    }).lean();

    res.header("Location", `http://localhost:3000/blog/posts/${req.params.id}`);
    res.status(200).json(removeFields(post));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createPost,
  deletePost,
  updatePost,
};
