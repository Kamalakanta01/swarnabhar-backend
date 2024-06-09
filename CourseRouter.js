const express = require("express");
const { Course } = require("./CourseSchema");
const { User } = require("./UserSchema");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        if (req.userRole !== "instructor") {
            return res.status(403).send("Access denied");
        }
        const { title, description } = req.body;
        const newCourse = new Course({ title, description, instructor: req.userID });
        await newCourse.save();
        res.status(201).send("Course created successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        if (req.userRole !== "instructor") {
            return res.status(403).send("Access denied");
        }
        const { title, description } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        res.status(200).send("Course updated successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        if (req.userRole !== "instructor") {
            return res.status(403).send("Access denied");
        }
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).send("Course deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/enroll/:id", async (req, res) => {
    try {
        if (req.userRole !== "student") {
            return res.status(403).send("Access denied");
        }
        const course = await Course.findById(req.params.id);
        course.students.push(req.userID);
        await course.save();
        res.status(200).send("Enrolled successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor").populate("students");
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;