const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("google", { scope: ["email", "profile"] }));

// Auth Callback
router.get(
    "/callback",
    passport.authenticate("google", {
        successRedirect: "/auth/google/callback/success",
        failureRedirect: "/auth/google/callback/failure",
    }),
);

// Success
router.get("/callback/success", (req, res) => {
    if (!req.user) res.redirect("/auth/google/callback/failure");

    res.send("Welcome " + req.user.email);
});

// failure
router.get("/callback/failure", (req, res) => {
    res.send("Error");
});

module.exports = router;
