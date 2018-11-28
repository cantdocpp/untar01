const Patient = require("../model/patient.js");
const Doctor = require("../model/doctor.js");
const JadwalDokter = require("../model/jadwal_dokter.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let Pusher = require("pusher");
require("dotenv").config();

var pusher = new Pusher({
  appId: "648367",
  key: "eb98b9cdfd884e56a7b0",
  secret: "1a158555d9f1546130b3",
  cluster: "ap1"
});

module.exports = {


  registerPatient: (req, res) => {

    var istaken = false;

    Patient.findOne({
        email: req.body.email
      })
      .then(function (user) {
        if (user != null) {
          istaken = true;
        }
      })
      .then(function () {

        if (istaken != true) {
          var info = req.body;
          info.channel_id = random_id();

          create_patien(info);

        } else {
          res.status(401).json({
            message: "Email Exist"
          });
        }
      })




    function create_patien(info) {
      Patient.create(info)
        .then(function (response) {
          if_suces();
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "something wrong is happening :"
          });
        });
    }




    function if_suces() {
      console.log('masuk setelah bikin database')
      res.status(200).json({
        message: "success creating patient data"
      });
    }

    function random_id() {
      return Math.floor(Math.random() * Math.floor(100000000));
    }
  },


  getAllPatient: (req, res) => {
    Patient.find({})
      .then(userData => {
        /*  pusher.trigger("my-channel", "my-event", {
           data: userData
         }); */


        res.status(200).json({
          data: userData
        });


      })
      .then(function (user) {
        console.log("kepangil");
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({
          message: "something bad happened"
        });
      });
  },

  loginPatient: (req, res, next) => {
    Patient.findOne({
        email: req.body.email
      })
      .then(function (user) {
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
          var token = jwt.sign({
              id: user._id,
              role: "patient",
              channel_id: user.channel_id,
              name: user.name
            },
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
      .catch(function (err) {
        res.status(500).json({
          message: "something went wrong"
        });
      });
  },
  makeschedule: function (req, res) {

    var doctor_valid = false;
    var patient_valid = false;
    var dr_chanel="";

    Doctor.findOne({_id:req.params.doctor_id})
          .then(function(response){
            
          if(response !=null){
            dr_chanel=response.channel_id;
           
            doctor_valid=true;}

          })
          .then(function(){

          if(doctor_valid == true)
          {
            

            Patient.findOne({ _id:req.body.id_pasien})
            .then(function(response){

              if(response !=null){patient_valid=true;}

            })
            .then(function(){

              if(patient_valid == true)
              {
              
                createobject(req);
              }
              else
              {
                  res.status(500).json({
                    message: 'patient id not valid'
                  });
              }
              

            })
            .catch(function (err) {
              res.status(500).json({
                message: "something went wrong make"
              });
            });

          }
          else
          {
                    res.status(500).json({
                      message: 'doctor id not valid'
                    });
          }



          }).catch(function (err) {
            console.log(err)
            res.status(500).json({
              message: "something went wrong"
            });
          });



    function createobject(req){
      var create_object={};
      create_object.nama_pasien=req.body.nama_pasien;
      create_object.id_pasien=req.body.id_pasien;
      create_object.tanggal_pesan=req.body.tanggal_pesan;
      create_object.nama_dokter=req.body.nama_dokter;
      create_object.Alamat=req.body.Alamat;
      create_object.keluhan=req.body.keluhan;
      create_object.id_dokter=req.params.doctor_id;
      create_object.status="true"
      create_object.harga=req.body.harga;
      makeschedule(create_object)
    }


    function makeschedule(info) {
      
      JadwalDokter.create(info)
        .then(function (response) {

          pusher.trigger(dr_chanel, "add-patient", {
            data: response
          });

          res.status(200).json({
            message: "success creating patient data"
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "something wrong is happening :"
          });
        });

    }


    // JadwalDokter.find({})
    //   .then(function (response) {

    //     res.status(200).json({
    //       message: response
    //     });

    //   })
    //   .catch(function (err) {
        
    //     res.status(500).json({
    //       message: "something went wrong"
    //     });

    //   });

  }

};