const Account = require("../models/account");
const Comment = require("../../../src/blog/models/comment");
const Profile = require("../../profile/models/profile");
const Post = require("../../../src/blog/models/post");

const { emailValidator, passwordValidator } = require("../validators");
const { getUrl } = require("../../../utils/getter");

const deleteAccount = async (req, res) => {
    try {
        const profiles = await Profile.find({ owner: req.account });

        await Promise.all(
            profiles.map(async (profile) => {
                await Promise.all([Comment.deleteMany({ owner: profile.id }), Post.deleteMany({ owner: profile.id }), Profile.findOneAndDelete({ id: profile.id })]);
            }),
        );

        const account = await Account.findOneAndDelete({ id: req.account });

        if (!account) {
            res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json({ msg: "account deleted" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

    try {
        const account = await Account.findOne({ email: email });

        if (!account) {
            return res.status(400).json({ error: "Email and password are invalid" });
        }

        account.comparePassword(password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(400).json({ error: "Email and password are invalid" });
            }

            return res.status(200).json({
                id: account.id,
                email: account.email,
                token: account.generateJwt(),
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    if (!emailValidator(email)) {
        return res.status(400).json({ error: "Email is invalid" });
    }

    if (!passwordValidator(password)) {
        return res.status(400).json({ error: "Password is invalid" });
    }

    const exists = await Account.findOne({ email: email });
    if (exists) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const account = new Account({
        email: email,
        password: password,
    });

    try {
        await account.save();

        res.header("Location", getUrl(req, account.id));
        res.status(201).json({ id: account.id, email: account.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { deleteAccount, login, register };
