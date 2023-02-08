const router = require("express").Router();
const { createProfile } = require("./controllers/profile_controller");

router.get("/", (req, res) => {
  res.json("Get owner profile");
});

// @route   POST /
router.post("/", createProfile);

router.get("/:id", (req, res) => {
  res.json("Get profile by id");
});

router.get("/:id/posts", (req, res) => {
  res.json("Get posts");
});

router.get("/:id/comments", (req, res) => {
  res.json("Get comments");
});

module.exports = router;
