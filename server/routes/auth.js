const express = require("express");
const router = express.Router();
const passport = require("passport");
// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const { JWT_SECRET } = require("../config/keys");

router.get(
  "/google",
  // ⓵ trigger user to click log in
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  // return a code for userinfo then call authenticate again
  // to exchange user profile and email from google
  // ③
  // (req, res, next) => {
  //   console.log(req.get("host") + req.originalUrl);
  // },
  passport.authenticate("google"),
  // ⑤ the last call back
  // return a valid token
  (req, res) => {
    // const payload = JSON.parse(JSON.stringify(req.user)); // convert to plain obj
    // jwt.sign(
    //   payload,
    //   keys.secretOrKey,
    //   { expiresIn: TWO_HOUR },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({
    //       success: true,
    //       token: `Bearer ${token}`
    //     });
    //   }
    // );
    res.redirect("/");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/");
  }
);

// router.post(
//   "/google",
//   passport.authenticate("google-plus-token", { session: false }),
//   (req, res) => {
//     const token = signToken(req.user);
//     res.status(200).json({ token });
//   }
// );

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/getuser", (req, res) => {
  res.send({ user: res.locals.user || null });
});

// const signToken = user => {
//   return jwt.sign(
//     {
//       iss: "SuperIssuer",
//       data: "foobar",
//       sub: user.id,
//       iat: new Date().getTime(), // current time
//       exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
//     },
//     JWT_SECRET
//   );
// };

module.exports = router;
