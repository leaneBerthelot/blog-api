const mongoose = require("mongoose");
const Profile = require("./profile");

const personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  {
    discriminatorKey: "kind",
  }
);

module.exports = Profile.discriminator("person", personSchema);
