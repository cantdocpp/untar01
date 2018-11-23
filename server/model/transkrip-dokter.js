const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let transkripDokter = mongoose.Schema({
  nama_pasien: {
    type: String,
    required: true
  },
  nama_dokter: {
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
  harga: {
      type: Number,
      required: true
  }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  // userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let Transkrip = mongoose.model("transkrip_dokter", transkripDokter);

module.exports = Transkrip;
