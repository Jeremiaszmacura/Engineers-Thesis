const { User } = require("../models");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;


module.exports = (passport) => {
    passport.use(
        new localStrategy ( async (email, password, done) => {
            try {
                console.log('hi')
                const user = await User.findOne({ where: { email: email } });
                if (!user) return done(null, false, { message: "No such an email registered." });
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result) return done(null, user);
                    return done(null, false, { message: "Wrong password." });
                });
            } catch (err) {
                console.log(err);
                return done(err, false, { message: "Something went wrong." });
            }
        })
    );

  
    passport.serializeUser((user, done) => {
        console.log('serializeUser');
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        console.log('deserializeUser');
        User.findOne({ email: email }, (err, user) => {
            const userInformation = {
                email: user.email,
            };
            done(err, userInformation);
        });
    });
};
