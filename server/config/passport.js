const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require("passport");

/**
 * @param passport: passport object from passport package
 */
module.exports = passport => {
  const { googleClientID, googleClientSecret } = keys;
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `/auth/google/callback`,
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        registerUser(profile, done);
      }
    )
  );

  const registerUser = (profile, done) => {
    let image = profile.photos[0].value;
    // cast away query param
    image = image.substring(0, image.indexOf("?"));

    const {
      id,
      name: { givenName, familyName },
      emails: [{ value: email }]
    } = profile;
    const newUser = {
      googleID: id,
      firstName: givenName,
      lastName: familyName,
      email: email,
      image: image
    };

    // Check for existing user
    User.findOne({ googleID: id }).then(user => {
      if (user) {
        return done(null, user);
      }
      new User(newUser).save().then(user => {
        return done(null, user);
      });
    });
  };
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    // console.log("deserializeUser:", id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
