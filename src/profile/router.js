const router = require("express").Router();

const { createProfile } = require("./controllers/profile_controller");

// @route   GET /
router.get("/", (req, res) => {});

// @route   POST /
router.post("/", createProfile);

// @route   GET /:id
router.get("/:id", (req, res) => {});

// @route   GET /:id/posts
router.get("/:id/posts", (req, res) => {});

// @route   GET /:id/comments
router.get("/:id/comments", (req, res) => {});

module.exports = router;
