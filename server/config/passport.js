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
        callbackURL: `https://localhost:${
          process.env.PORT
        }/auth/google/callback`
      },
      (accessToken, refreshToken, profile, done) => {
        console.log({ accessToken, profile });
      }
    )
  );
};
