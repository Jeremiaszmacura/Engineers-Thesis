const db = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");


const registerIndex = (req, res) => {
    res.send("register get");
};


const registerPost = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // second param is salt
};


const loginIndex = (req, res) => {
    res.send("login get");
};


const loginPost = async (req, res) => {
    res.send("login post")
};


const logout = (req, res) => {
    res.send("logout")
};


const allUsers = async (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users);
            res.send("all users");
        })
        .catch(err => console.log(err));
}


module.exports = {
    registerIndex,
    registerPost,
    loginIndex,
    loginPost,
    logout,
    allUsers
};
