const Doctor = require("../model/doctor.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
	
  registerDoctor: (req, res) => {
    Doctor.create(req.body)
      .then(function(response) {
        console.log(req.body);
        console.log(response);
        res.status(200).json({
          message: "success registering doctor"
        });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({
          message: "something bad happening at the server"
        });
      });
  },

  loginDoctor: (req, res) => {
    Doctor.findOne({ email: req.body.email })
      .then(function(user) {
        if (!user) {
          res.status(401).json({
            message: "there's no such user, asshole"
          });
        }

        let randomNumber = Math.random() * 100;

        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 5; i++)
            text += possible.charAt(
              Math.floor(Math.random() * possible.length)
            );

          return text;
        }

        const hashedPassword = user.password;
        const doc_idrandom = randomNumber + "" + makeid();
        if (bcrypt.compareSync(req.body.password, hashedPassword)) {
          var token = jwt.sign(
            { email: user.email, id: user._id, role: "doctor" },
            "shhhhh"
          );
          console.log("testing");
          console.log(token, "<<<<<<< dari controller doctor");
          res.status(200).json({
            token: token,
            id: user._id,
            email: user.email,
            dokter: doc_idrandom
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
  },

  getAllDoctor: (req, res) => {
    Doctor.find({})
    .then(function(res) {
      res.status(200).json({
        data: res
      })
    })
    .catch(function(err) {
      res.status(400).json({
        message: 'something bad happening'
      })
    })
  },
  
  getprofileDoctor:(req, res) => {
	  res.status(200).json({
       info_dokter:{
		          nama_dokter:'dokter',
            spesialist_dokter:'dokter jantung',
            alamat_dokter:'jln abc',
            rating_dokter:7.5
		   },
		review:[{
            nama_pasien: 'sule',
            rating_pasien: 7.5,
            review_pasien: 'a'
        }]
      })
/*     Doctor.find({})
    .then(function(res) {
 
    })
    .catch(function(err) {
      res.status(400).json({
	  
        message: 'something bad happening'
      })
    }) */
  }
  
};
