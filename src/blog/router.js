const express = require("express");
const router = express.Router();

const Post = require("./models/post");

const RESPONSE_MESSAGES = require("../../__constants__/response_messages");

const { _lengthValidator } = require("./validator");
const { getAll, getById, createPost, deletePost, updatePost } = require("./controllers/post_controller");
const { getAllComments, createComment, deleteComment } = require("./controllers/comment_controller");

router.use((req, res, next) => {
  delete req.body.id;
  delete req.body.__v;

  next();
});

const postExistsMiddleware = async function (req, res, next) {
  const post = await Post.findOne({ id: req.params.id });
  if (!post) {
    return res.status(404).json({ msg: RESPONSE_MESSAGES.POST_NOT_FOUND });
  }

  req.post = post;

  next();
};

const contentBodyMiddleware = function (req, res, next) {
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ msg: "content is required" });
  }

  if (!_lengthValidator(content, 10, 200)) {
    return res.status(400).json({ msg: RESPONSE_MESSAGES.INVALID_POST_BODY_LENGTH(10, 200) });
  }

  next();
};

// GET ALL (/) retourné en JSON TOUS les posts
router.get("/posts/", getAll);

// GET BY ID (:id) retourné en JSON un post
router.get("/posts/:id", getById);

// POST (/) créer un post
router.post("/posts/", contentBodyMiddleware, createPost);

// PATCH (:id) modifier un post
router.patch("/posts/:id", postExistsMiddleware, contentBodyMiddleware, updatePost);

// DELETE (:id) supprimer un post
router.delete("/posts/:id", postExistsMiddleware, deletePost);

// COMMENT
// @route   GET api/blog/posts/:id/comments
router.get("/posts/:id/comments", postExistsMiddleware, getAllComments);

// @route   POST api/blog/posts/:id/comments
router.post("/posts/:id/comments", postExistsMiddleware, createComment);

// @route   DELETE api/blog/comments/:commentId
router.delete("/comments/:id", deleteComment);

module.exports = router;
