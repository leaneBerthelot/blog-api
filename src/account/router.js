const express = require("express");
const router = express.Router();

// @route   POST /account/login
router.post('/login', (req, res) => {
    res.json('Login');
});

// @route   POST /account/register
// @body    {email, password}
router.post('/register', (req, res) => {
    res.json('Register');
});

module.exports = router;