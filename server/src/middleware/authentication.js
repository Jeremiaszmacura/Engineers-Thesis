// require('dotenv').config()

// const jwt = require('jsonwebtoken');


// const authenticateUser = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.status(401).json("Unauthorized. You have to loggin first.");

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//         if (err) return res.status(403).json("Forbidden. Invalid access token.");
//         req.userUuid = payload.userUuid;
//         next();
//     });
// };


const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) { next(); }
    return res.status(401).json("Unauthorized. You have to loggin first.");
};


module.exports = {
    authenticateUser
};
