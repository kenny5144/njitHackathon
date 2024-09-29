const express = require("express");
const cors = require("cors");
const session = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const { setUpPassportLocal } = require("./middleware/middleware.js");
const dotenv = require("dotenv");
require("dotenv").config();
const userRoutes = require("./routes/user.js");
const authMiddleware = passport.authenticate("bearer", { session: false });

const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const logger = (req, _res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} ${req.method}: ${req.url}`);
  next();
};

app.use(logger);

app.use("/", uploadRoutes);
app.use("/user", userRoutes(authMiddleware));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
setUpPassportLocal(passport);
app.use(passport.session());
app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
