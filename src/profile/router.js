const router = require("express").Router();

const { createProfile } = require("./controllers/profile_controller");

// @route   GET /
router.get("/", (req, res) => {});

// @route   POST /
router.post("/", createProfile);

// TODO
router.patch("/", (req, res) => {});

// TODO
router.get("/:id", (req, res) => {});

// TODO
router.get("/:id/posts", (req, res) => {});

// TODO
router.get("/:id/comments", (req, res) => {});

module.exports = router;
