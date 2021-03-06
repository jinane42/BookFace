const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fileupload = require("express-fileupload");

//passport config:
require("./config/passport")(passport);

//mongoose DIOGO version
mongoose
  .connect(
    "mongodb+srv://jinane3:jinane3@bookface.wanum.mongodb.net/BookFace?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected,,"))
  .catch((err) => console.log(err));

//Cloudinary config
cloudinary.config({
  cloud_name: "dmqk246zd",
  api_key: "916155187143796",
  api_secret: "9A0ZLM0-LyLOI_HnVsqtqtzrYnw",
});

//ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(fileupload({ useTempFiles: true }));
app.use("/static", express.static("public"));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/profiles", require("./routes/profiles"));
app.use("/posts", require("./routes/posts"));

app.listen(3000);
