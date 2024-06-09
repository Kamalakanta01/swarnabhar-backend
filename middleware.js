const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Please login first!");
    }

    let token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Please login first!");
    }

    jwt.verify(token, process.env.SECRET, function (error, decoded) {
        if (decoded) {
            req.userID = decoded.userID;
            req.userRole = decoded.role;
            next();
        } else {
            res.status(401).send("Please login first");
        }
    });
}

module.exports = authentication;