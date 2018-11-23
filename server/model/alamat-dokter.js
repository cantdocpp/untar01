const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let alamatDoctorSchema = mongoose.Schema({
  kota: {
    type: String,
    required: true
  },
  provinsi: {
    type: String,
    required: true,
    unique: true
  },
  kecamatan: {
    type: String,
    required: true
  },
  Lat: {
    type: String,
    required: true
  },
  Long: {
    type: String,
    required: true,
    unique: true
  },
  doctors: [
    {
      type: Schema.Types.ObjectId,
      ref: Doctor
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let AlamatDoctor = mongoose.model("alamat_doctor", alamatDoctorSchema);

module.exports = AlamatDoctor;
