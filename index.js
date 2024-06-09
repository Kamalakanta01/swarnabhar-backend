const express = require("express");
const jwt = require("jsonwebtoken");
const { connection } = require("./connection");
const userRouter = require("./UserRouter");
const courseRouter = require("./CourseRouter");
const assignmentRouter = require("./AssignmentRouter");
const authentication = require("./middleware");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.use("/user", userRouter);
app.use("/course", authentication, courseRouter);
app.use("/assignment", authentication, assignmentRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Server running on port 8080");
    } catch (err) {
        console.log(err.message);
    }
});