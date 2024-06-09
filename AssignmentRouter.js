const express = require("express");
const { Assignment } = require("./AssignmentSchema");
const router = express.Router();

router.post("/submit", async (req, res) => {
    try {
        if (req.userRole !== "student") {
            return res.status(403).send("Access denied");
        }
        const { title, course, content } = req.body;
        const newAssignment = new Assignment({ title, course, student: req.userID, content });
        await newAssignment.save();
        res.status(201).send("Assignment submitted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/feedback/:id", async (req, res) => {
    try {
        if (req.userRole !== "instructor") {
            return res.status(403).send("Access denied");
        }
        const { feedback, grade } = req.body;
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { feedback, grade }, { new: true });
        res.status(200).send("Feedback provided successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/", async (req, res) => {
    try {
        if (req.userRole !== "instructor") {
            return res.status(403).send("Access denied");
        }
        const assignments = await Assignment.find().populate("course").populate("student");
        res.status(200).send(assignments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;