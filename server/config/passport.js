const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");

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
        callbackURL: `auth/google/callback`,
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        console.log({ accessToken, profile });
      }
    )
  );
};
