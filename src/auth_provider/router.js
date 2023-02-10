const express = require("express");
const router = express.Router();

router.use("/google", require("./google/google_passport"));

module.exports = router;
