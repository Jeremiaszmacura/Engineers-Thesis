const authenticateUser = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json("Unauthorized. You have to loggin first.");
    next();
};


module.exports = {
    authenticateUser
};
