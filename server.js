const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const keys = require("./server/config/keys");
const PORT = process.env.PORT || 3000;

// Setup User Model
require("./server/model/User");

// Passport Config
const passport = require("passport");
require("./server/config/passport")(passport);

// Load Routes
const authRoutes = require("./server/routes/auth");

// Mongoose Connect
const mongoose = require("mongoose");
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("> mLab MongoDB Connected"))
  .catch(console.log);

const loadServer = () => {
  const express = require("express");
  const server = express();
  const session = require("express-session");
  const MongoDBStore = require("connect-mongodb-session")(session);
  const TWO_HOUR = 1000 * 60 * 60 * 2;
  const cors = require("cors");
  const {
    ensureAuthenticated
  } = require("./server/middlewares/ensureAuthenticated");
  const { loadUser } = require("./server/middlewares/loadUser");

  // Set Session store
  const store = new MongoDBStore(
    {
      uri: keys.mongoURI,
      collection: "sessions"
    },
    () => {
      console.log("> MongoDB store connected");
    }
  );

  store.on("error", function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

  server.use(
    session({
      secret: "secretsssss",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        maxAge: TWO_HOUR
      }
    })
  );

  server.use(cors());
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(loadUser);

  server.get("/", (req, res) => {
    app.render(req, res, "/", { user: res.locals.user });
  });

  server.get("/about", (req, res) => {
    app.render(req, res, "/about");
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
