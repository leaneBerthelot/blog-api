const Post = require("./models/post");
const Profile = require("../profile/models/profile");
const RESPONSE_MESSAGES = require("../../__constants__/response_messages");
const { _lengthValidator } = require("./validator");

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

const ownerBodyMiddleware = function (req, res, next) {
    const owner = req.body.owner;

    if (!owner) {
        return res.status(400).json({ msg: "owner is required" });
    }

    next();
};

const isOwnerMiddleware = async (req, res, next) => {
    if (req.profile.owner !== req.account) {
        return res.status(401).json({ msg: "user is not the owner of the profile" });
    }

    next();
};

const profileExistMiddleware = async (req, res, next) => {
    const profile = await Profile.findOne({ id: req.body.owner }).lean().exec();

    if (!profile) {
        return res.status(404).json({ msg: "profile does not exist" });
    }

    next();
};

module.exports = {
    contentBodyMiddleware,
    postExistsMiddleware,
    ownerBodyMiddleware,
    isOwnerMiddleware,
    profileExistMiddleware,
};
