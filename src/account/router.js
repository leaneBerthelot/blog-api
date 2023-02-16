const express = require("express");
const router = express.Router();

const authenticateMiddleware = require("../../middlewares/authenticate");
const { deleteAccount, login, register } = require("./controllers/account_controller");

router.post("/login", login);

router.post("/register", register);

router.get("/verify", authenticateMiddleware, (req, res) => {
    res.status(200).json({ id: req.id, email: req.email });
});

router.post("/forgot-password", (req, res) => {
    const { email, password } = req.body;

    try {
        res.json("Forgot");
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/reset-password", (req, res) => {
    const { email, password } = req.body;

    try {
        res.json("Reset password");
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/change-password", async (req, res) => {
    const { email, password } = req.body;

    try {
        res.json("Change");
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/delete", authenticateMiddleware, deleteAccount);

module.exports = router;
