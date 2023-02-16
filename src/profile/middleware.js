const Profile = require("./models/profile");

const isOwnerMiddleware = async (req, res, next) => {
    if (req.profile.owner != req.account) {
        return res.status(401).json({ msg: "user is not the owner of the profile" });
    }

    next();
};

const profileExistMiddleware = async (req, res, next) => {
    const profile = await Profile.findOne({ id: req.params.id }).lean().exec();

    if (!profile) {
        return res.status(404).json({ msg: "profile does not exist" });
    }

    req.profile = profile;

    next();
};

const numberAccountMiddleware = async (req, res, next) => {
    const nbAccount = await Profile.find({ owner: req.account }).count();

    if (nbAccount >= 5) {
        return res.status(500).json({ msg: "Too many accounts created" });
    }

    next();
};

module.exports = {
    isOwnerMiddleware,
    profileExistMiddleware,
    numberAccountMiddleware,
};
