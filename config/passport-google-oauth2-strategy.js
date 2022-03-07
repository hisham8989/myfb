const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
        clientID:"405310244444-jhbb6m7q5ehg25uq9l79m74k0t7nvt8m.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:9000/users/auth/google/callback",
    },
    function (accessToken,refreshToken,profile,done) {
        User.findOne({email:profile.emails[0].value}).exec(function (err,user) {
            if(err){console.log("error in google Strategy",err);return}

            console.log(profile);

            if(user){

                //if user found set this user as req.user
                return done(null,user)
            }else{

                // if user not found, create a user set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:photos[0].value
                },function (err,user) {
                    if(err){console.log("error in creating User",err);return}

                    return done(null,user)
                })
            }
        })
    }


))


module.exports = passport;