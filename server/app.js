const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://philip12:mongoose12@ds041178.mlab.com:41178/sehat",
  err => {
    if (err) {
      console.log(err, "err");
    }
    console.log("berhasil koneks ");
  }
);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");

const app = express();
app.use(cors({credentials: true, origin: true}));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


//Add Header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/patients", usersRouter);
app.use("/doctor", doctorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
