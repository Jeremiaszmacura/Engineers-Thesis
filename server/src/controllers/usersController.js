const bcrypt = require("bcrypt");

const { sequelize, User } = require('../models');


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
        return res.status(500).json(err);
    }
};


const loginPost = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.json("No such an email registered.");
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result) {
                return res.json(user);
            }
            return res.json("Wrong password.");
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


const allUsersGet = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Getting all users ocured error' });
    }
};


const UserGet = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { uuid: uuid }
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Getting all users ocured error' });
    }
};


module.exports = {
    registerPost,
    loginPost,
    allUsersGet,
    UserGet
};
