const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { MONGO_URI, SESSION_SECRET } = require("./server/config/keys");
const PORT = process.env.PORT || 3000;
const express = require("express");
const server = express();
const session = require("express-session");
const TWO_HOUR = 1000 * 60 * 60 * 2;

// Mongoose Connect
const mongoose = require("mongoose");
mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("> mLab MongoDB Connected"))
  .catch(console.log);
// Setup User Model
require("./server/model/User");

// Passport Config
const passport = require("passport");
require("./server/config/passport");

// Load Routes
const authRoutes = require("./server/routes/auth");

const loadServer = () => {
  const MongoStore = require("connect-mongo")(session);
  // const cors = require("cors");
  const { loadUser } = require("./server/middlewares/loadUser");

  // Set Session store
  const store = new MongoStore({ mongooseConnection: mongoose.connection });

  store.on("error", function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

  // Set Session Config
  server.use(
    session({
      store: store,
      secret: "secretsssss",
      rolling: false,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: false,
        maxAge: TWO_HOUR
      }
    })
  );

  server.use(passport.initialize());
  server.use(passport.session());

  server.use(loadUser);
  // server.use(express.static(__dirname + "/node_modules"));
  server.get("/", (req, res) => {
    app.render(req, res, "/");
  });

  server.get("/about", (req, res) => {
    app.render(req, res, "/about");
  });

  server.get("/verify", passport.authenticate("google"), (req, res) => {
    res.send(req.user);
  });

  server.get("/p/:id", (req, res) => {
    const actualPage = "/post";
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // Use Routes
  server.use("/auth", authRoutes);

  // handle the all the rest routes to be 404
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

app
  .prepare()
  .then(loadServer)
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
