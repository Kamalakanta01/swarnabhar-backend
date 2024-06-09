const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    feedback: { type: String },
    grade: { type: Number }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = { Assignment };