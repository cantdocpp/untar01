const Doctor = require("../model/doctor.js");
const JadwalDokter = require("../model/jadwal_dokter.js");
const transkripDokter = require("../model/transkrip-dokter.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let Pusher = require("pusher");

var pusher = new Pusher({
  appId: "648367",
  key: "eb98b9cdfd884e56a7b0",
  secret: "1a158555d9f1546130b3",
  cluster: "ap1"
});

module.exports = {
  registerDoctor: (req, res) => {
    var istaken=false;

    //validataing email
    Doctor.findOne({ email: req.body.email })
    .then(function(user) {

      if(user != null)
        {
          istaken=true;
        }
      
    })
    .then(function(){

   if(istaken == false){

 
    let randomNumber = Math.random() * 100;

    function makeid() {
      console.log("masuk function make id");
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    const hashedPassword = req.body.password;
    const doc_idrandom = randomNumber + "" + makeid();
    req.body.channel_id = doc_idrandom;

    
    Doctor.create(req.body)
      .then(function(response) {
        console.log("selesai masuk database");
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

    }else{
      res.status(500).json({
        message: "Email Is taken"
      });
    }
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
            message: "Email Atau Password Salah"
          });
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
        const doc_idrandom = randomNumber + "" + makeid();



        if (bcrypt.compareSync(req.body.password, hashedPassword)) {
          var token = jwt.sign(
            { name: user.name, id: user._id,channel_id:user.channel_id, role: "doctor" },
            "shhhhh"
          );

          res.status(200).json({
            token: token
          });

        } else {
          res.status(401).json({
            message: "wrong password"
          });
        }
      })
      .catch(function(err) {
        res.status(500).json({
          message: "Email Atau Password Salah"
        });
      });
  },
  getdashboard:(req,res)=>{

    console.log(req.params.id);
    
    //current pesan
    var Json_build =[];
    var new_obj={};
    new_obj.nama_pasien = 'suel';
    new_obj.alamat_pasien = 'Jl. ABC No. 50 Jakarta Pusat';
    new_obj.no_telp_pasien= '0861';
    new_obj.tanggal_pasien= 1543132940;
    new_obj.keluhan_pasien= 'll';

    Json_build.push(new_obj);
    
    res.status(200).json(Json_build);



  },
  getAllDoctor: (req, res) => {
    Doctor.find({})
      .then(function(response) {
        res.status(200).json({
          data: response
        });
      })
      .catch(function(err) {
        res.status(400).json({
          message: "something bad happening"
        });
      });
  },
  getDoctorById: (req, res) => {

    Doctor.findOne({ _id: req.params.id })
      .then(function(response) {
        // res.status(200).json({
        //   data: response
        // });

        console.log(response);
        
        res.status(200).json({
          info_dokter: {
            nama_dokter: response.name,
            spesialist_dokter: response.specialist,
            alamat_dokter: "jln abc",
            rating_dokter: response.rating,
            Jpraktek:"",
            Experience:"",
            Service:"",
            Education:""
          },
          review: [
            { 
              nama_pasien: "sule",
              rating_pasien: 7.5,
              review_pasien: "a"
            }
          ]
        });


      })
      .catch(function(err) {
        res.status(500).json({
          message: "something wrong is happening at the server"
        });
      });
  },

  getDoctorBySpeciality: (req, res) => {
    console.log('masuk ke specialist function')
    Doctor.find({ specialist: req.params.specialist })
      .then(function(response) {
        console.log(response)
        let data = response
        res.status(200).json({
          data: data
        })
      })
      .catch(function(err) {
        console.log(err)
        res.status(500).json({
          message: 'something wrong is happening'
        });
      });
  },

  editDoctorById: (req, res) => {



    // {nomor_ijin : req.body.nomor_ijin}
    // Doctor.findOneAndUpdate({ _id: req.params.id })
    // .exec()
    //   .then(function(response) {
    //     console.log(response)
    //     res.status(200).json({
    //       message: "edit data success"
    //     });
    //   })
    //   .catch(function(err) {
    //     res.status(500).json({
    //       message: "something wrong is happening at the server"
    //     });
    //   });
  },
  finishchedule:(req, res) => {

     console.log(req.params.apoinment_id);
     var data="";
     JadwalDokter.findOne({ _id: req.params.apoinment_id})
     .then(function(response){

      data=response;
      console.log(data.nama_pasien);


      // { id_pasien: [ 5bfe87df80878435109982da ],
      //   id_dokter: [ 5bfe9cc2d517d60fd4938454 ],
      //   _id: 5bfed31e6860600cac3c4b6b,
      //   nama_pasien: 'Sugi',
      //   tanggal_pesan: '1543423058',
      //   nama_dokter: 'Daok',
      //   Alamat: 'Tidak ada',
      //   keluhan: 'sakit mata',
      //   status: 'true',
      //   harga: 120000,
      //   createdAt: 2018-11-28T17:40:46.712Z,
      //   updatedAt: 2018-11-28T17:40:46.712Z,
      //   __v: 0 }
      




      // transkripDokter

     }).then(function(){

      console.log(data);


      var new_object={};
      new_object.nama_pasien=data.nama_pasien
      new_object.nama_dokter=data.nama_dokter
      new_object.id_pasien=data.id_pasien
      new_object.id_dokter=data.id_dokter
      new_object.tanggal_pesan=data.tanggal_pesan
      new_object.resep_dokter=req.body.resep
      new_object.saran_dokter=req.body.saran
      new_object.harga=data.harga


      transkripDokter.create(new_object)
      .then(function(response) {
        console.log("selesai masuk database");





        JadwalDokter.findOneAndRemove({ _id: req.params.apoinment_id}).exec()
        .then(function(response) {
          console.log(response)
          res.status(200).json({
            message: "save to history"
          });
        })
        .catch(function(err) {
          res.status(500).json({
            message: "something wrong is happening at the server"
          });
        });


      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({
          message: "something bad happening at the server"
        });
      });



     }).catch(function(err) {
      res.status(500).json({
        message: "something wrong is happening at the server"
      });
    });

  },
  cancleshedule:(req,res)=>{
    JadwalDokter.findOneAndRemove({ _id: req.params.apoinment_id}).exec()
    .then(function(response) {
      console.log(response)
      res.status(200).json({
        message: "remove data successful"
      });
    })
    .catch(function(err) {
      res.status(500).json({
        message: "something wrong is happening at the server"
      });
    });
  }


};
