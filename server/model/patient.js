const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let patientSchema = mongoose.Schema({
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
  alamat: {
    type: String,
    required: true
  },
  channel_id: {
    type: String,
    unique: true
  },
  is_active: {
    type: Boolean
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

patientSchema.pre("save", function() {
  const saltRounds = 10;
  const myPlaintextPassword = this.password;
  var salt = bcrypt.genSaltSync(saltRounds);
  console.log("=============", myPlaintextPassword);
  var hash = bcrypt.hashSync(myPlaintextPassword, salt);
  this.password = hash;
});

let Patients = mongoose.model("Patient", patientSchema);

module.exports = Patients;
