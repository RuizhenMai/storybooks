module.exports = {
  loadUser: (req, res, next) => {
    res.locals.user = req.user;
    next();
  }
};
