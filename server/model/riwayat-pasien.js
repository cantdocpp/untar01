const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let riwayatPasienSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id_pasien: [
    {
      type: Schema.Types.ObjectId,
      ref: Patient
    }
  ],
  tanggal_pesan: {
    type: Date,
    required: true
  },
  resep_dokter: {
    type: String,
    required: true
  },
  saran_dokter: {
    type: String,
    required: true
  },
  id_dokter: [
    {
      type: Schema.Types.ObjectId,
      ref: Doctor
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let riwayatPasien = mongoose.model("riwayat_pasien", riwayatPasienSchema);

module.exports = riwayatPasien;
