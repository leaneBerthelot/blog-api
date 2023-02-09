const express = require("express");
const router = express.Router();
const Account = require("./models/account");

const { getUrl } = require("../../utils/getter");
const { emailValidator, passwordValidator } = require("./validators");

// @route   POST /account/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1000)
    );

    try {
        const account = await Account.findOne({ email: email });

        if (!account) {
            return res.status(400).json({ error: "Email and password are invalid" });
        }

        account.comparePassword(password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(400).json({ error: "Email and password are invalid" });
            }

            return res.status(200).json({ id: account.id, email: account.email });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /account/register
// @body    {email, password}
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    if(!emailValidator(email)) {
        return res.status(400).json({ error: "Email is invalid" });
    }

    if(!passwordValidator(password)) {
        return res.status(400).json({ error: "Password is invalid" });
    }

    const exists = await Account.findOne({ email: email });
    if(exists) {
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
});

module.exports = router;
