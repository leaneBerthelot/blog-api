const Person = require("../models/person");
const Company = require("../models/company");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createProfile = async (req, res) => {
  const { kind, ...body } = req.body;
  let profile;

  try {
    switch (kind) {
      case "person":
        profile = new Person(body);
        break;
      case "company":
        profile = new Company(body);
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

  // profile
  //     .save()
  //     .then((doc) => {
  //       res.header("Location", getUrl(req, doc.id));
  //       res.status(201).json(doc);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ msg: err });
  //     });
};

module.exports = {
  createProfile,
};
