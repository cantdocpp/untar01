const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let jadwalDokter = mongoose.Schema({
  nama_pasien: {
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
  nama_dokter: {
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
  Alamat: {
    type: String,
    required: true
  },
  keluhan: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let JadwalDokter = mongoose.model("jadwal_dokter", jadwalDokter);

module.exports = JadwalDokter;
