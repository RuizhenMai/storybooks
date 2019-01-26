module.exports = {
  ensureAuthenticated: (req, res, next) => {
    // or we can check req.user
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }
};
