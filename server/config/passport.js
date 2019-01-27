// const GooglePlusTokenStrategy = require("passport-google-plus-token");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET
} = require("./keys");
const User = require("mongoose").model("users");
const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

// const googleStrategy = new GooglePlusTokenStrategy( // ②
//   {
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log("authorized");
//     registerUserAndDone(profile, done);
//   }
// );

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  // ④
  function(request, accessToken, refreshToken, profile, done) {
    registerUserAndDone(profile, done, "google");
  }
);

const registerUserAndDone = async (profile, done, from) => {
  try {
    const {
      id,
      name: { givenName, familyName },
      emails: [{ value: email }]
    } = profile;

    let newUser = {
      firstName: givenName,
      lastName: familyName,
      email: email
    };
    if (from == "google") {
      const existingUser = await User.findOne({ googleID: id });
      if (existingUser) return done(null, existingUser);

      let image = profile.photos[0].value;
      // cast away query param
      image = image.substring(0, image.indexOf("?"));
      newUser.googleID = id;
      newUser.image = image;
    } else if (from == "facebook") {
      const existingUser = await User.findOne({ facebookID: id });
      if (existingUser) return done(null, existingUser);

      newUser.facebookID = id;
    }

    newUser = await new User(newUser).save();
    done(null, newUser);
  } catch (err) {
    done(err, false, err.message);
  }
};

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = JWT_SECRET;

// const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
//   const user = await User.findById(jwt_payload.sub).catch(err =>
//     done(err, false)
//   );
//   if (!user) return done(null, false);
//   done(null, user);
// });

const facebookStrategy = new FacebookStrategy(
  {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "emails", "name"]
  },
  async function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    //   return cb(err, user);
    // });
    registerUserAndDone(profile, done, "facebook");
  }
);

passport.use(googleStrategy);
passport.use(facebookStrategy);
// passport.use(jwtStrategy);

// 4.5
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(null, user);
  });
});
