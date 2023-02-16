const router = require("express").Router();

const { createProfile, getMyProfiles, getById, getProfilePosts, getProfileComments, updateProfile, deleteProfile } = require("./controllers/profile_controller");

const { isOwnerMiddleware, profileExistMiddleware, numberAccountMiddleware } = require("./middleware");

// @route   GET /profile
router.get("/", getMyProfiles);

// @route   POST /profile
router.post("/", numberAccountMiddleware, createProfile);

// @route PATCH /profile/:id
router.patch("/:id", profileExistMiddleware, isOwnerMiddleware, updateProfile);

// @route DELETE /profile/:id
router.delete("/:id", profileExistMiddleware, isOwnerMiddleware, deleteProfile);

// @route   GET /profile/:id
router.get("/:id", profileExistMiddleware, getById);

// @route   GET /profile/:id/posts
router.get("/:id/posts", profileExistMiddleware, getProfilePosts);

// @route   GET /profile/:id/comments
router.get("/:id/comments", profileExistMiddleware, getProfileComments);

module.exports = router;
