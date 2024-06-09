const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("./UserSchema");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, username, role } = req.body;
        if (!username) {
            return res.status(400).send("Username is required");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, username, role });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userID: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1h" });
            res.status(200).send({ message: "Login successful", token, user: user.username });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/logout", (req, res) => {
    res.status(200).send("Logout successful");
});

module.exports = router;