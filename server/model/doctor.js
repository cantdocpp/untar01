const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nomor_ijin: {
    type: String,
    required: true
  },
  channel_id: {
    type: String,
    required: true,
    unique: true
  },
  jadwal_praktek: {
    type: [
      {
        hari: String,
        jam: String
      }
    ],
    required: true
  },
  specialist: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  experience: {
    type: [
      {
        from: Date,
        to: Date,
        work_place: String
      }
    ],
    required: true
  },
  pendidikan: {
    type: [
      {
        from: Date,
        to: Date,
        school: String
      }
    ],
    required: true
  },
  service: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

doctorSchema.pre("save", function() {
  const saltRounds = 10;
  const myPlaintextPassword = this.password;
  var salt = bcrypt.genSaltSync(saltRounds);
  console.log("=============", myPlaintextPassword);
  var hash = bcrypt.hashSync(myPlaintextPassword, salt);
  this.password = hash;
});

let Doctors = mongoose.model("Doctor", doctorSchema);

module.exports = Doctors;
