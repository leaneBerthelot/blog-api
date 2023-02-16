const Comment = require("../../blog/models/comment");
const Company = require("../models/company");
const Person = require("../models/person");
const Post = require("../../blog/models/post");
const Profile = require("../models/profile");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createProfile = async (req, res) => {
    const { kind, ...body } = req.body;
    let profile;

    try {
        switch (kind) {
            case "person":
                profile = new Person({ ...body, owner: req.account });
                break;
            case "company":
                profile = new Company({ ...body, owner: req.account });
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        await profile.save();

        res.header("Location", getUrl(req, profile.id));
        res.status(201).json(removeFields(profile.toObject()));
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getMyProfiles = async (req, res) => {
    const profiles = await Profile.find({ owner: req.account });

    res.status(200).json({
        profiles: profiles,
    });
};

const getById = async (req, res) => {
    try {
        res.status(200).json(removeFields(req.profile));
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getProfilePosts = async (req, res) => {
    const count = await Post.find({ owner: req.profile.id }).count();
    const limit = 10;
    let page = !req.body.page ? 1 : req.body.page;
    const totalPages = Math.ceil(count / limit) != 0 ? Math.ceil(count / limit) : 1;
    page = page > totalPages ? totalPages : page;

    const postes = await Post.find({ owner: req.profile.id })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
        .exec();

    res.status(200).json({
        posts: removeFields(postes),
        currentPage: parseInt(page),
        totalPages: totalPages,
    });
};

const getProfileComments = async (req, res) => {
    const count = await Comment.find({ owner: req.profile.id }).count();
    const limit = 10;
    let page = !req.body.page ? 1 : req.body.page;
    const totalPages = Math.ceil(count / limit) != 0 ? Math.ceil(count / limit) : 1;
    page = page > totalPages ? totalPages : page;

    const comments = await Comment.find({ owner: req.profile.id })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
        .exec();

    res.status(200).json({
        comments: removeFields(comments),
        currentPage: parseInt(page),
        totalPages: totalPages,
    });
};

const updateProfile = async (req, res) => {
    let update;
    const kind = req.profile.kind;

    try {
        switch (kind) {
            case "person":
                update = {
                    bio: req.body.bio,
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    updatedAt: Date.now(),
                };
                break;
            case "company":
                update = {
                    bio: req.body.bio,
                    username: req.body.username,
                    name: req.body.name,
                    updatedAt: Date.now(),
                };
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        const profile = await Profile.findOneAndUpdate(req.profile.id, update, {
            new: true,
            runValidators: true,
        })
            .lean()
            .exec();

        res.header("Location", getUrl(req, req.profile.id));
        res.status(200).json(removeFields(profile));
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        await Promise.all([Comment.deleteMany({ owner: req.profile.id }), Post.deleteMany({ owner: req.profile.id }), Profile.findOneAndDelete({ id: req.profile.id })]);

        res.status(200).json({ msg: "profile deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    createProfile,
    getMyProfiles,
    getById,
    getProfilePosts,
    getProfileComments,
    updateProfile,
    deleteProfile,
};
