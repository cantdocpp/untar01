const Patient = require("../model/patient.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let Pusher = require("pusher");
require("dotenv").config();

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_SECRET_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
});

module.exports = {
  registerPatient: (req, res) => {
    Patient.create(req.body)
      .then(response => {
        console.log(req.body);
        console.log(response);
        res.status(200).json({
          message: "success creating patient data"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "something wrong is happening :" + err
        });
      });
  },

  getAllPatient: (req, res) => {
    Patient.find({})
      .then(userData => {
        pusher.trigger("my-channel", "my-event", {
          data: userData
        });
        res.status(200).json({
          data: userData
        });
      })
      .then(user => {
        console.log("kepangil");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "something bad happened"
        });
      });
  },

  loginPatient: (req, res, next) => {
    Patient.findOne({ email: req.body.email })
      .then(function(user) {
        console.log(user, "<<<<<<<<<<<<<<<<<<<<<<<< user");
        if (!user) {
          console.log("masuk sini anjing");
          next();
        }

        let randomNumber = Math.random() * 100;

        function makeid() {
          var text = "";
          var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 5; i++)
            text += possible.charAt(
              Math.floor(Math.random() * possible.length)
            );

          return text;
        }

        const hashedPassword = user.password;
        const pas_idrandom = randomNumber + "" + makeid();
        console.log(hashedPassword, "<<<<<<<<<<< hashed password");
        if (bcrypt.compareSync(req.body.password, hashedPassword)) {
          var token = jwt.sign(
            { email: user.email, id: user._id, role: "patient" },
            "shhhhh"
          );
          console.log("testing");
          console.log(token, "<<<<<<< dari controller patient");
          res.status(200).json({
            token: token,
            id: user._id,
            email: user.email,
            pasien: pas_idrandom
          });
        } else {
          res.status(401).json({
            message: "wrong password"
          });
        }
      })
      .catch(function(err) {
        res.status(500).json({
          message: "something went wrong"
        });
      });
  }
};
