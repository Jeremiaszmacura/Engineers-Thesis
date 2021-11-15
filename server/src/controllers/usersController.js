require('dotenv').config();

const bcrypt = require("bcrypt");
const passport = require("passport");
passportLocal = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');

// require('../middleware/passportConfig')(passport);

const { User } = require("../models");


const generateAccessToken = (user) => {
    return jwt.sign(
        { userUuid: user.uuid, isAuth: "true", role: user.role }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1200s' }
        );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        { userUuid: user.uuid, isAuth: "true", role: user.role }, 
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '525600s' }
        );
};


const updateRefreshToken = async (user, refreshToken) => {
    user.refreshToken = refreshToken;
    await user.save();
};


const registerPost = async (req, res) => {
    const { name, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // second param is salt
    const authToken = (Math.random() + 1).toString(36).substring(2);
    const role = "user";
    try {
        const user = await User.create({ name, email, password: hashedPassword, authToken, role });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const loginPost = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json("Wrong username or password");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({
                message: "Successfully Authenticated",
                role: user.role,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
          });
        }
      })(req, res, next);
};


const checkIfLoggedIn = (req, res) => {
    return res.json({ loggedIn: true })
};


const logoutGet = (req, res) => {
    req.logout();
    res.status(200).json("Successfully logged out")
};


const allUsersGet = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const UserGet = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { uuid: uuid },
            include: 'exams'
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const UserDelete = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.params.uuid } });
        await user.destroy();
        return res.json({ message: 'User deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const UserUpdate = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const user = await User.findOne({ where: { uuid: req.params.uuid } });
        if (name) { user.name = name; }
        if (email) { user.email = email; }
        if (password) { user.password = password; }
        if (role) { user.role = role; }
        await user.save();
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


const refreshTokenPost = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(401).json("Unauthorized");
    const user = await User.findOne({ where: { refreshToken: refreshToken } });
    if (!user) return res.status(403).json("Forbidden. No such refresh token");
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, tokenUser) => {
        if (err) return res.status(403).json("Forbidden. Invalid refresh token");
        const accessToken = generateAccessToken(tokenUser.userUuid);
        return res.json({ accessToken: accessToken });
    });
};


module.exports = {
    registerPost,
    loginPost,
    logoutGet,
    allUsersGet,
    UserGet,
    UserDelete,
    UserUpdate,
    refreshTokenPost,
    checkIfLoggedIn
};
